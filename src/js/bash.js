/**
 * Bash constructor
 * @constructor
 */
function Bash () {}

Bash.prototype.commanded = function (v) {
	console.log(v)
}

Object.defineProperty(Bash.prototype, 'command', {
	set: Bash.prototype.commanded
});