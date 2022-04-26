let MySolt;
export default {
	install(Vue, opts) {

		let add = function(e, el, stl) {
			// console.log(e)
			//判断形状 -- 
			let max2 = [stl.width, stl.height].sort(function(a, b) {
				return b - a;
			})[0];
			let scale = 0;
			let a = 0.8
			if (!MySolt) {
				MySolt = document.createElement("view");
				MySolt.className = "i_opa";
				let tiemr = setInterval(() => {
					if (scale >= 1 || a <= 0) {
						scale = 0;
						a = 0.8;
						clearInterval(tiemr);
						MySolt.remove()
						MySolt = false;
						return;
					}

					MySolt.style.width = `${max2*2}px`;
					MySolt.style.height = `${max2*2}px`;
					MySolt.style.left = `${e.detail.x - e.currentTarget.offsetLeft}px`;
					MySolt.style.top = `${e.detail.y - e.currentTarget.offsetTop}px`;
					MySolt.style.background = "rgba(0, 122, 255," + a + ")";
					MySolt.style.transform = "translate(-50%,-50%) scale(" + scale + ")";
					scale += 0.01;
					a -= 0.008;
				}, 5)
				el.appendChild(MySolt)
			}
		}
		if (!Vue.$add) {
			Vue.$add = add;
		}
		// 3. 注入组件选项
		Vue.mixin({
			created: function() {
				// 逻辑...
				this.$add = Vue.$add;
			}
		})
	}
}
