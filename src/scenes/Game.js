import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    preload() { } create() {
        const ball = this.add.circle(400, 250, 1, 0xffffff, 1);
        ball.setStrokeStyle(20, 0xffffff);
        this.physics.add.existing(ball);
        ball.body.setVelocity(-200, 0);
        ball.body.setCollideWorldBounds(true, 1, 1);
        ball.body.setBounce(1, 1)
        const paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(paddleLeft, true);
        this.physics.add.collider(paddleLeft, ball);




    }
}
