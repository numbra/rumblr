let XboxController = require('./lib/xbox')
let xbox = new XboxController()
let enabled = false
let power = 1.0
let left = 1, right = 0

function updateRumble() {
	if(enabled) {
		xbox.rumble(Math.ceil(power * 255) * left, Math.ceil(power * 255) * right)
		xbox.setLed(0x00)
	} else {
		xbox.rumble(0,0)
		xbox.setLed(0x06)
	}
}

xbox.on('xboxbutton:release', function (key) {
	enabled = !enabled
	updateRumble()
})

xbox.on('dup:release', function (key) {
	if(power + 0.1 <= 1) power += 0.1
		updateRumble()
})
xbox.on('ddown:release', function (key) {
	if(power - 0.1 >= 0) power -= 0.1
		updateRumble()
})
xbox.on('dright:release', function (key) {
	left = 0
	right = 1
	updateRumble()
})
xbox.on('dleft:release', function (key) {
	left = 1
	right = 0
	updateRumble()
})

/* Init */
xbox.on('connected', function() {
	console.log('Xbox controller connected')
	console.log(xbox.serialNumber + ' online')
	xbox.setLed(0x06)
})

xbox.on('not-found', function() {
	console.log('Xbox controller could not be found')
})