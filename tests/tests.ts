import * as pulumi from "@pulumi/pulumi";
import "mocha";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): { id: string, state: any } {
        return {
            id: "2",
            state: {
                name: args.inputs.name,
                orgId: 2
            }
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        return args.inputs;
    },
},
    "project",
    "stack",
    false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("Grafana", function() {
    let infra: typeof import("./index");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    describe("#OrgName", function() {
        it("Foo is the name!", function(done) {
            pulumi.all([infra.grafana.urn, infra.grafana.grafanaOrg.name]).apply(([urn, name]) => {
                if (name != "foo") {
                    done(new Error(`foo ist not the name on ${urn}`));
                } else {
                    done();
                }
            });
        });
    });

    describe("#OrgId", function() {
        it("ID 2 it is", function(done) {
            pulumi.all([infra.grafana.urn, infra.grafana.grafanaOrg.orgId]).apply(([urn, id]) => {
                if (id != 2) {
                    done(new Error(`it is not id 2 on ${urn}`));
                } else {
                    done();
                }
            });
        });
    });
});
