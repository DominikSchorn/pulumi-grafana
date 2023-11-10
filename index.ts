import * as grafana from "@lbrlabs/pulumi-grafana";
import * as pulumi from "@pulumi/pulumi";

export class Grafana extends pulumi.ComponentResource {
    grafanaOrg: grafana.Organization;

        constructor(orgName: string, opts: any, admins?: string[], editors?: string[], viewers?: string[]) {
        super("dominike93:project:Grafana", orgName, {}, opts);

        this.grafanaOrg = new grafana.Organization(orgName, {
            name: orgName,
            admins: admins,
            editors: editors,
            viewers: viewers
        }, { parent: this });

        this.registerOutputs({
            grafanaOrg: this.grafanaOrg,
        });
    }
}
