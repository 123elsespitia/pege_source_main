import kaboom from "kaboom"
import loadAssets from "./assets"
//Fixed assets load
//CodedByLuis
//CompetPanas
//#LuisNet
kaboom({ 
  scale: 1,
font: "sinko",
background: [ 0, 0, 0 ]
})
loadAssets()
function patrol(speed = 60, dir = 1) {
	return {
		id: "patrol",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function big() {
	let timer = 0
	let isBig = false
	let destScale = 1
	return {
		id: "big",
		require: [ "scale" ],
		update() {
			if (isBig) {
				timer -= dt()
				if (timer <= 0) {
					this.biggify()
				}
			}
			this.scale = this.scale.lerp(vec2(destScale), dt() * 6)
		},
		isBig() {
			return isBig
		},
		smallify() {
			destScale = 1
			timer = 0
			isBig = false
		},
		biggify(time) {
			destScale = 2
			timer = time
			isBig = true
		},
	}
}
loadSprite("dino", "/sprites/dino.png", {

	sliceX: 9,

	anims: {
		"idle": {
      

			from: 0,
			to: 3,

			speed: 2,
			loop: true,
		},
		"run": {
			from: 4,
			to: 7,
			speed: 10,
			loop: true,
		},

		"jump": 8
	},
})


const JUMP_FORCE = 1320
const MOVE_SPEED = 300
const FALL_DEATH = 2400

const LEVELS = [
	[
		"p                        p",
		"p                        p",
		"p                        p",
		"p                        p",
		"p                        p",
		"p      $ $               p",
		"p     $  =      $$       p",
		"p    $   =     ====      p",
		"p        =               p",
		"p        = $$$$$$$$$$$  @p",
		"==========================",
	],
	[
		"p                        $       p",
		"p                       ===      p",
		"p                                p",
		"p                 $              p",  
		"p                ===    $        p",
		"p                      ===       p",
		"p            $              $    p",
		"p           ===     $      ===   p",
		"p      $           ===           p",
		"p     ===                      @ p",
		"=====                        =====",
	],
        [
                "p                            p",
		"p                            p",
		"p                            p",
		"p                            p",
		"p                            p",
		"p                            p",
		"p                            p",
		"p          $$   $$   $$      p",
		"p            $    $    $     p",
		"p                            p",
		"p   ^^     ^^   ^^   ^^     @p",
		"==============================",

	], 
	[       
		"p                                   ",
		"p                                   ",
		"p                                   ",
		"p                                   ",
		"p                               @   ",
		"p                             ====  ",
		"p    $  =             =>=           ",
		"p    $  =            ====           ",
		"p    $  =                           ",
		"p    $  =                           ",
		"p    >  =     =>=                   ",
		"=================                   ",
	 
	 ],
	 [	
		"                                                                                    ",
		"                    $ $ $ $ $ $               $                                     ",
		"                   $   $   $   $             ===                                    ",
		"                                        $                    @                      ",
		"                                       ===           $     ====                     ",
		"                  =>^^^>^^^>^^^                     ===                             ",
		"               ===================                                                  ",
		"                                                                                    ",  
		"                                                                                    ",
		"       =>=                                                                          ",
		"       ====   $                                     $$$$$$                          ",
	        "             $ $                                   ========                         ", 
		"                        $                   $                                       ",
		"             ^^^       ===                 ===                                      ",
		"           =======             $  $                                                 ",   
		"                             ========                                               ",
		"                                                                                    ",  
		"                                                              =>=                   ",
		"                                                      $      ====                   ", 
		"                                                                                    ", 
		"                                                      ^                             ",
		"                                             $      =====                           ",  
		"                                                                                    ",
		"                         $    $    $         ^                                      ",
		"                                           =====                                    ",   
		"                                                                                    ",
		"                        ^^^  ^^^  ^^^                                               ",
		"==============      ===================                                             ",
	],
[
		"p                                                                 ^^^^^^^^^ p         ",
		"p            ^^     $ $ $ $ $ $    ^^         $                             p         ",
		"p                  $   $   $   $             ===                            p         ",
		"p                                       $                    @              p         ",
		"p                                      ===           $     ====             p         ",
		"p                 =>^^^>^^^>^^^                     ===                     p         ",
		"p            ======================                                         p         ",
		"p                                                                           p         ",  
		"p                                       $                                   p         ",
		"p                     $              ======                                 p         ",
	        "p                  ======                                                   p         ", 
		"p                                                                           p         ",
		"p                                                                           p         ",
		"p                   p                           $$                          p         ",  
		"p           >       p                $                      $               p         ",
		"p         ===========    ^^^^^^^^   ===        ^^^^        ===              p         ", 
		"p                                                                    $      p         ", 
		"p                                                                   ===     p         ",
		"p                                                                           p         ",  
		"p                                                     $        ^^^^         p         ",
		"p                                                   ====                    p         ",
		"p                                                                           p         ",   
		"p                                                                           p         ",
		"p    ^^^^                                                  ===              p         ",
		"==============pp p  pp ==== ^^^ ==== ^^^ ==== ^^^ ====        ==========    p         ",
	],
	]
      
const levelConf = {
	width: 64,
	height: 64,
	"=": () => [
		sprite("grass"),
		area(),
		solid(),
		origin("bot"),
	],
	
		"p": () => [
		sprite("piedra"),
		area(),
		solid(),
		origin("bot"),
	],
	"$": () => [
		sprite("coin"),
		area(),
		pos(0, -9),
		origin("bot"),
		"coin",
	],
	"%": () => [
		sprite("prize"),
		area(),
		solid(),
		origin("bot"),
		"prize",
	],
	"^": () => [
		sprite("spike"),
		area(),
		solid(),
		origin("bot"),
		"danger",
	],
	"#": () => [
		sprite("apple"),
		area(),
		origin("bot"),
		body(),
		"apple",
	],
	">": () => [
		sprite("ghosty"),
		area(),
		origin("bot"),
		body(),
		patrol(),
		"enemy",
	],
	"@": () => [
		sprite("portal"),
		area({ scale: 0.5, }),
		origin("bot"),
		pos(0, -12),
		"portal",
	],
}

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

	gravity(3200)


	const level = addLevel(LEVELS[levelId ?? 0], levelConf)

let myCheckpoint = vec2(177, 179)
const player = add([
	sprite("dino"),
	pos(88, 88),
	origin("center"),
	area(),
	body(),
  scale(22),
  big(),
	origin("bot"),
])

player.onUpdate(() => {
     if(player.pos.x > 210) { 
         myCheckpoint = vec2(210, 80);
     }
})



player.onGround(() => {
	if (!isKeyDown("left") && !isKeyDown("right")) {
		player.play("idle")
	} else {
		player.play("run")
	}
})

player.onAnimEnd("idle", () => {

})

onKeyPress("space", () => {
	if (player.isGrounded()) {
		player.jump(JUMP_FORCE)
    player.biggify(3)
		player.play("jump")
	}
})

onKeyDown("left", () => {
	player.move(-MOVE_SPEED, 0)
	player.flipX(true)
  player.biggify(5)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyDown("right", () => {
	player.move(MOVE_SPEED, 0)
	player.flipX(false)
  player.biggify(5)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyRelease(["left", "right"], () => {
	if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
		player.play("idle")
	}
})


	player.onUpdate(() => {

		camPos(player.pos)

		if (player.pos.y >= FALL_DEATH) {
			player.pos = myCheckpoint;
		}
	})

	player.onCollide("danger", () => {
		player.pos = myCheckpoint;
		play("hit")
	})

	player.onCollide("portal", () => {
		play("portal")
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
	})

	player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			play("powerup")
		}
	})

player.onCollide("player", "enemy", (p, e) => {
    player.pos = myCheckpoint;
})

	player.onCollide("enemy", (e, col) => {

		if (!col.isBottom()) {
			play("hit")
      player.pos = myCheckpoint;
		}
	})

	let hasApple = false


	player.onHeadbutt((obj) => {
		if (obj.is("prize") && !hasApple) {
			const apple = level.spawn("#", obj.gridPos.sub(0, 1))
			apple.jump()
			hasApple = true
			play("blip")
		}
	})


	player.onCollide("apple", (a) => {
		destroy(a)

		player.biggify(5)
		hasApple = false
		play("powerup")
	})

	let coinPitch = 0

	onUpdate(() => {
		if (coinPitch > 0) {
			coinPitch = Math.max(0, coinPitch - dt() * 100)
		}
	})

	player.onCollide("coin", (c) => {
		destroy(c)
    player.biggify(5)
		play("coin", {
			detune: coinPitch,
		})
		coinPitch += 100
		coins += 1
		coinsLabel.text = coins
	})

	const coinsLabel = add([
		text(coins),
		pos(24, 24),
		fixed(),
	])


	onKeyPress("space", () => {

		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
      player.biggify(5)
		}
	})

	onKeyDown("left", () => {
		player.move(-MOVE_SPEED, 0)
    player.biggify(5)
	})

	onKeyDown("right", () => {
		player.move(MOVE_SPEED, 0)
    player.biggify(5)
	})

	onKeyPress("down", () => {
		player.weight = 3
    
	})

	onKeyRelease("down", () => {
		player.weight = 1
    //player.pos = myCheckpoint;
		//fixed spawnpoint on Key release
	})

	onKeyPress("f", () => {
		fullscreen(!fullscreen())
	})

})

scene("lose", () => {
	add([
		text("NOT USED, HOWEVER DEVELOPERS KNOW WHAT THEY DO ;)"),
	])
	onKeyRelease(() => {
    player.pos = myCheckpoint;
	})
})

scene("win", () => {
	add([
		text("DEVOPS"),
	])
	onKeyPress(() => go("game"))
})

go("game")
