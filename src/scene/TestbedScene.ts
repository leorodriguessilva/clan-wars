export class TestbedScene extends Phaser.Scene {

    private debugText: Phaser.GameObjects.Text;

    private scout: Phaser.Geom.Rectangle;

    private scoutVision: Phaser.Geom.Circle;

    private resource: Phaser.Geom.Rectangle;

    private graphics: Phaser.GameObjects.Graphics;

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
        this.graphics = this.add.graphics();
        this.scout = new Phaser.Geom.Rectangle(this.scoutPosX, this.scoutPosY, 20, 20);
        this.scoutVision = new Phaser.Geom.Circle(this.scoutPosX, this.scoutPosY, 80);//80, 0x000000
        this.resource = new Phaser.Geom.Rectangle(0, 0, 80, 80);//0xffff00

        this.debugText = this.add.text(10, 500, "Debug", { color: "#00ff00" });
    }

    public update(): void {
        this.draw();
        this.scoutPosX = this.scout.centerX - 1;
        this.scoutPosY = this.scout.centerY - 1;

        Phaser.Geom.Rectangle.CenterOn(this.scout, this.scoutPosX, this.scoutPosY);
        this.scoutVision.x = this.scoutPosX;
        this.scoutVision.y = this.scoutPosY;

        if (Phaser.Geom.Intersects.CircleToRectangle(this.scoutVision, this.resource)) {
            this.isResourceScouted = true;
        }

        const debug = [
            `Scouted the resource: ${this.isResourceScouted}`,
            `Scout X: ${this.scoutPosX}`,
            `Scout Y: ${this.scoutPosY}`,
        ];
        this.debugText.setText(debug);
    }

    private draw(): void {
        this.graphics.clear();
        this.graphics.lineStyle(2, 0xffffff);
        this.graphics.strokeRectShape(this.scout);
        this.graphics.strokeCircleShape(this.scoutVision);

        this.graphics.lineStyle(2, 0xffff00);
        this.graphics.strokeRectShape(this.resource);
    }

}
