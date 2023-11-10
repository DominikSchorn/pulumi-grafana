import * as grafana from "@lbrlabs/pulumi-grafana";
import * as pulumi from "@pulumi/pulumi";

export class Grafana extends pulumi.ComponentResource {
    grafanaOrg: grafana.Organization;

    constructor(orgName: string, opts: any) {
        super("dominike93:project:Grafana", "Grafana", {}, opts);

        this.grafanaOrg = new grafana.Organization("this", {
            name: orgName,
        }, { parent: this });

        this.registerOutputs({
            grafanaOrg: this.grafanaOrg,
        });
    }
}
