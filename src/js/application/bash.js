define(function (require) {
	var Folder = require('folder');

	/**
	 * Global variable which will
	 * keep the bash variables.
	 * @constructor
	 */
	function bash () {
		var components = [],
		self = this;

		function component (name, constructor) {
			var component;

			components.forEach(function (key) {
				if(key.name === name) throw new Error ('You are trying to redeclare' + name + '. You cannot redeclare a component.');

				component = {
					name: name,
					constructor: constructor
				};
			});

			if(!component) return;

			components.unshift(component);

			return self;
		}

		this.component = component;
		this.new = function () {
			return new self.Bash;
		}

		return this;
	}

	/**
	 * Bash constructor
	 * @constructor
	 */
	function Bash () {
		var self = this;

		function onChange (value) {
			console.log(value);
		}

		Object.defineProperty(this, 'command', {
			set: onChange
		});

		return this;
	}

	bash.Bash = Bash;

	return bash;
});