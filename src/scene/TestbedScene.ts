export class TestbedScene extends Phaser.Scene {

    private debugText: Phaser.GameObjects.Text;

    private scout: Phaser.GameObjects.GameObject;

    private scoutVision: Phaser.GameObjects.GameObject;

    private resource: Phaser.GameObjects.GameObject;

    private detection: Phaser.Physics.Arcade.Collider;

    private isResourceScouted: boolean;

    private scoutPosX: number;

    private scoutPosY: number;

    constructor() {
        super({
            key: "TestbedScene",
        });
    }

    public init(params: any): void {
        this.isResourceScouted = false;
        this.scoutPosX = 500;
        this.scoutPosY = 500;
    }

    public preload(): void { }

    public create(): void {
        this.add.rectangle(0, 0, 2000, 2000, 0xffffff);
        this.scout = this.add.rectangle(this.scoutPosX, this.scoutPosY, 20, 20, 0x000000);
        this.scoutVision = this.add.circle(this.scoutPosX, this.scoutPosY, 80, 80, 0x000000);
        this.resource = this.add.rectangle(0, 0, 80, 80, 0xffff00);
        this.detection = this.physics.add.collider(this.scoutVision, this.resource, () => {
            this.isResourceScouted = true;
        });

        this.debugText = this.add.text(10, 500, "Debug", { color: "#00ff00" });
    }

    public update(): void {
        this.detection.update();
        this.scoutPosX++;
        this.scoutPosY++;
        const debug = [
            `Scouted the resource: ${this.isResourceScouted}`,
            `Scout X: ${this.scoutPosX}`,
            `Scout Y: ${this.scoutPosY}`,
        ];
        this.debugText.setText(debug);
    }

}
