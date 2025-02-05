import { join } from "path";
import { fileURLToPath } from "url";
import type { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { Cluster, KubernetesVersion } from "aws-cdk-lib/aws-eks";

import { dependencies as packages } from "../package.json";
import { name as packageName } from "../package.json";

const packagesRoot = join(fileURLToPath(import.meta.url), "..", "../..");

interface ServiceProps extends StackProps {
  readonly cronEventRule?: boolean;
  readonly intervalDays?: string;
}

export class CdkStarterStack extends Stack {
  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id, props);

    // Create an EKS cluster
    const cluster = new Cluster(this, `${packageName}-cluster`, {
      version: KubernetesVersion.V1_31,
    });

    const apps = Object.keys(packages).filter((packageName) =>
      packageName.startsWith("@demo")
    );
    for (const app in apps) {
      cluster.addManifest(`${app}-deployment`, {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: { name: `${app}-deployment` },
        spec: {
          replicas: 2,
          selector: { matchLabels: { app: `${app}` } },
          template: {
            metadata: { labels: { app: `${app}` } },
            spec: {
              containers: [
                {
                  name: `${app}`,
                  image: join(packagesRoot, `${app}/Dockerfile`),
                  ports: [{ containerPort: 3000 }],
                },
              ],
            },
          },
        },
      });

      // Create a service to expose the deployment
      cluster.addManifest(`${app}-service`, {
        apiVersion: "v1",
        kind: "Service",
        metadata: { name: `${app}-service` },
        spec: {
          type: "LoadBalancer",
          selector: { app },
          ports: [{ port: 80, targetPort: 3000 }],
        },
      });
    }
  }
}
