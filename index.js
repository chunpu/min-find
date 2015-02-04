module.exports = exports = find

// id http://www.w3.org/TR/html4/types.html#type-id
// http://www.w3.org/TR/html-markup/syntax.html#tag-name
// jquery cannot deal with colons (":"), and periods ("."), and we believe most people never use it

var isValid = /^[-\w]+$/

var root = document

// always return array
function find(selector, box) {
	box = box || root
	var ret = []
	var nodes
	if (selector && box.getElementsByTagName) {
		selector += ''
		if (isValid.test(selector)) {
			// is tag
			nodes = box.getElementsByTagName(selector)
		} else {
			var id = selector.substr(1)
			if (root == box && '#' == selector.charAt(0) && isValid.test(id)) {
				// is id and from document
				var elem = root.getElementById(id)
				if (elem) {
					return [elem]
				}
			} else {
				// try query select, it will also panic when '#100000'
				try {
					nodes = box.querySelectorAll(selector)
				} catch (ignore) {}
			}
		}
		if (nodes) {
			var len = nodes.length || 0
			for (var i = 0; i < len; i++) {
				ret.push(nodes[i])
			}
		}
	}
	return ret
}
