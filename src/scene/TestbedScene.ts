export class TestbedScene extends Phaser.Scene {

    private debugText: Phaser.GameObjects.Text;

    private isResourceScouted: boolean;

    constructor() {
        super({
            key: "TestbedScene",
        });
    }

    public init(params: any): void {
        this.isResourceScouted = false;
    }

    public preload(): void { }

    public create(): void {
        this.add.rectangle(0, 0, 800, 600, 0xffffff);
        const scout = this.add.rectangle(200, 200, 20, 20, 0x000000);
        const scoutVision = this.add.circle(200, 200, 80, 80, 0x000fff);
        const resource = this.add.rectangle(0, 0, 80, 80, 0xffff00);
        this.physics.add.collider(scoutVision, resource, () => {
            this.isResourceScouted = true;
        });

        this.debugText = this.add.text(10, 10, "Debug", { color: "#00ff00" });
    }

    public update(): void {
        const debug = [
            `Scouted the resource: ${this.isResourceScouted}`,
        ];
        this.debugText.setText(debug);
    }

}
