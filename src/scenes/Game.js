import Phaser from "phaser";


export default class Game extends Phaser.Scene {
    init() {
        this.paddleRightVelocity = new Phaser.Math.Vector2();
        this.leftScore = 0;
        this.rightScore = 0;
    }
    preload() {
        this.load.spritesheet("chicken", "sprite-sheet.png", { frameWidth: 84, frameHeight: 72 });

    }

    create() {
        this.add.sprite(400, 250, "chicken");

        this.physics.world.setBounds(-100, 0, 1000, 500);
        this.ball = this.add.circle(400, 250, 1, 0xffffff, 1);

        this.ball.setStrokeStyle(20, 0xffffff);
        this.physics.add.existing(this.ball);

        this.ball.body.setCollideWorldBounds(true, 1, 1);

        this.resetBall();

        this.ball.body.setBounce(1, 1)
        this.paddleLeft = this.add.rectangle(50, 250, 20, 120, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);
        this.physics.add.collider(this.paddleLeft, this.ball);
        this.paddleRight = this.add.rectangle(750, 250, 20, 120, 0xffffff, 1);
        this.physics.add.existing(this.paddleRight, true);
        this.physics.add.collider(this.paddleRight, this.ball);

        const scoreStyle = { fontSize: 48 }
        this.leftScoreLabel = this.add.text(300, 125, "0", scoreStyle)
            .setOrigin(0.5, 0.5);

        this.rightScoreLabel = this.add.text(500, 375, "0", scoreStyle)
            .setOrigin(0.5, 0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

    }
    update() {
        const body = this.paddleLeft.body;
        if (this.cursors.up.isDown) {
            this.paddleLeft.y -= 10
            body.updateFromGameObject();
        }
        else if (this.cursors.down.isDown) {
            this.paddleLeft.y += 10
            body.updateFromGameObject();
        }

        const diff = this.ball.y - this.paddleRight.y;
        if (Math.abs(diff) < 10) { return }
        const aiSpeed = 3
        if (diff < 10)
        //ball above paddle
        {
            this.paddleRightVelocity.y = -aiSpeed;

            if (this.paddleRightVelocity.y < -10) { this.paddleRightVelocity.y = -10 }

        }
        else if (diff > 10)
        //ball below paddle
        {
            this.paddleRightVelocity.y = aiSpeed
            if (this.paddleRightVelocity.y > 10) { this.paddleRightVelocity.y = 10 }

        }
        this.paddleRight.y += this.paddleRightVelocity.y;
        this.paddleRight.body.updateFromGameObject();

        if (this.ball.x < -30) {
            //right scores on left
            this.resetBall();
            this.incrementRightScore();


        }

        else if (this.ball.x > 830) {
            //left scores on right
            this.resetBall();
            this.incrementLeftScore();
        }
    }

    incrementLeftScore() {
        this.leftScore += 1;
        this.leftScoreLabel.text = this.leftScore.toString();
    }

    incrementRightScore() {
        this.rightScore += 1;
        this.rightScoreLabel.text = this.rightScore.toString();
        console.log(this.LeftScore);
    }

    resetBall() {
        this.ball.setPosition(400, 250);
        const angle = Phaser.Math.Between(0, 360);

        const vec = this.physics.velocityFromAngle(angle, 200);
        this.ball.body.setVelocity(vec.x, vec.y);
    }


}
