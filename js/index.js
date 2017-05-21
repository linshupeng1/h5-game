var eggObj = {
	name: 'Lsp Development',
	verson: '20161230',
	num: 0,
	time: 0,
	hitNum: 3,
	wait: 60,
	rewardArr: [500, 20, 20, 20, 20, 100, 100, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0],
	recordHtml: '',
	load: function() {
		eggObj.num++;
		if (eggObj.num <= 99) {
			setTimeout("eggObj.load()", 10)
		} else {
			$(".load-wrap").hide();
			$(".invite-popup").fadeIn()
		};
		$(".counter").text(eggObj.num + "%");
		$(".load-bar-inner").css("left", eggObj.num * (2.9 / 100) + "rem")
	},
	invitePopup: function() {
		$(".invite-popup").on("click", ".btn-confirm", function() {
			var codeVal = $(".code-wrap input").val();
			if (codeVal != "") {
				$(".invite-popup").fadeOut();
				setTimeout(function() {
					$(".auth-popup").fadeIn()
				}, 1000)
			} else {
				$(".prompt").text("邀请码不能为空").fadeIn();
				setTimeout(function() {
					$(".prompt").fadeOut()
				}, 1000)
			}
		})
	},
	authPopup: function() {
		$(".auth-popup").on("click", ".btn-confirm", function() {
			var phoneVal = $(".auth-popup .phone-wrap .tel").val();
			var codeVal = $(".auth-popup .code-wrap input").val();
			var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if (phoneVal.trim() == "") {
				$(".prompt").text("手机号不能为空").fadeIn();
				setTimeout(function() {
					$(".prompt").fadeOut()
				}, 1000)
			} else if (phoneVal.length != 11 || !myreg.test(phoneVal)) {
				$(".prompt").text("请输入有效的手机号").fadeIn();
				setTimeout(function() {
					$(".prompt").fadeOut()
				}, 1000)
			} else if (codeVal.trim() == "") {
				$(".prompt").text("验证码不能为空").fadeIn();
				setTimeout(function() {
					$(".prompt").fadeOut()
				}, 1000)
			} else {
				$(".auth-popup").fadeOut();
				setTimeout(function() {
					$(".curtain-wrap .curtain").addClass("curtainOpen")
				}, 1000);
				setTimeout(function() {
					$(".curtain-wrap .curtain").css("width", "5%")
				}, 2000);
				setTimeout(function() {
					$(".rules-wrap .cloud1").addClass("cloud1Change");
					$(".rules-wrap .cloud2").addClass("cloud2Change");
					$(".rules-wrap .cloud3").addClass("cloud3Change");
					$(".eggs-wrap .egg").addClass("eggsChange")
				}, 3000)
			}
		})
	},
	loop: function() {
		eggObj.wait--;
		if (eggObj.wait === 0) {
			$('.btn-code').html("发送验证码");
			eggObj.wait = 10
		} else {
			$('.btn-code').html("倒计时" + eggObj.wait + "秒");
			setTimeout(function() {
				eggObj.loop()
			}, 1000)
		}
	},
	getCode: function() {
		$(".btn-code").on("click", function() {
			var phoneVal = $(".auth-popup .phone-wrap .tel").val();
			var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if (phoneVal.trim() == "") {
				$(".prompt").text("手机号不能为空").fadeIn();
				setTimeout(function() {
					$(".prompt").fadeOut()
				}, 1000)
			} else if (phoneVal.length != 11 || !myreg.test(phoneVal)) {
				$(".prompt").text("请输入有效的手机号").fadeIn();
				setTimeout(function() {
					$(".prompt").fadeOut()
				}, 1000)
			} else if ($('.btn-code').html() == "发送验证码") {
				eggObj.loop()
			}
		})
	},
	hitEgg: function() {
		$(".hit-egg .num").text(eggObj.hitNum);
		$(".eggs .egg-shade").on("click", function() {
			var _this = $(this);
			if (_this.find(".egg").css("display") != "none" && _this.find(".egg-part").css("opacity") == 1) {
				eggObj.hitNum--;
				_this.find(".hammer").show().addClass("hammerChange");
				_this.find(".lightning").fadeIn();
				_this.find(".egg-left").addClass("eggsSplit");
				_this.find(".red-enve").fadeIn();
				setTimeout(function() {
					$(".lightning").fadeOut();
					_this.find(".egg-left").css("opacity", "0");
					$(".eggs-wrap .egg").removeClass("eggsChange");
					_this.find(".egg-right").addClass("eggsSplit")
				}, 300);
				setTimeout(function() {
					_this.find(".egg-right").css("opacity", "0");
					_this.find(".red-enve").addClass("redEnveChange");
					_this.find(".hammer").hide()
				}, 800);
				setTimeout(function() {
					eggObj.getReward();
					_this.find(".red-enve").hide()
				}, 1600);
				setTimeout(function() {
					_this.find(".hammer").removeClass("hammerChange");
					$(".popup-wrap").find(".popup-cnt").removeClass("awardPopupDown");
					_this.find(".red-enve").removeClass("redEnveChange")
				}, 2700)
			}
		})
	},
	check: function() {
		$(".popup-wrap .popup-cnt,.btn-award").on("click", function() {
			$(".popup-wrap").find(".popup-cnt").removeClass("awardPopupDown").addClass("awardPopupUp");
			setTimeout(function() {
				$(".popup-wrap").hide()
			}, 500);
			setTimeout(function() {
				$(".curtain").removeClass("curtainOpen").addClass("curtainClose")
			}, 1000);
			setTimeout(function() {
				$(".curtain-wrap .curtain").css("width", "52%");
				$(".hit-egg, .btn-award").hide();
				$(".award-record, .btn-continue").show()
			}, 2000);
			setTimeout(function() {
				$(".curtain").removeClass("curtainClose").addClass("curtainOpen");
				$(".popup-wrap").find(".popup-cnt").removeClass("awardPopupUp")
			}, 3000);
			setTimeout(function() {
				$(".curtain-wrap .curtain").css("width", "3%")
			}, 4000)
		})
	},
	continueHit: function() {
		$(".btn-continue").on("click", function() {
			$(".eggs-wrap .egg-part").css("opacity", "1").removeClass("eggsSplit");
			setTimeout(function() {
				$(".curtain").removeClass("curtainOpen").addClass("curtainClose")
			}, 1000);
			setTimeout(function() {
				$(".curtain-wrap .curtain").css("width", "52%");
				$(".award-record, .btn-continue").hide();
				$(".hit-egg .tit .num").text(eggObj.hitNum);
				if (eggObj.hitNum == 0) {
					$(".egg").hide();
					$(".egg2").show()
				} else {
					$(".eggs-wrap .egg").addClass("eggsChange")
				}
				$(".hit-egg, .btn-award").show()
			}, 2000);
			setTimeout(function() {
				$(".curtain").removeClass("curtainClose").addClass("curtainOpen")
			}, 3000);
			setTimeout(function() {
				$(".curtain-wrap .curtain").css("width", "3%")
			}, 4000)
		})
	},
	getReward: function() {
		var rewardArr = eggObj.rewardArr;
		var rewardArrLen = rewardArr.length;
		var rewardVal = 0;
		eggObj.time++;
		for (var i = 0; i < rewardArrLen; i++) {
			var ran = Math.floor(Math.random() * rewardArrLen);
			rewardVal = rewardArr[ran]
		}
		eggObj.recordHtml += '<li>第' + eggObj.time + '次-------' + rewardVal + '元</li>';
		if (rewardVal == 0) {
			$(".no-award-popup").fadeIn();
			$(".no-award-popup").find(".popup-cnt").addClass("awardPopupDown")
		} else {
			$(".award-popup").fadeIn();
			$(".award-popup").find(".popup-cnt").addClass("awardPopupDown");
			$(".award-popup .result").text(rewardVal + '元')
		}
		$(".award-record .record").html(eggObj.recordHtml)
	}
};
$(document).ready(function() {
	eggObj.load();
	eggObj.invitePopup();
	eggObj.authPopup();
	eggObj.getCode();
	eggObj.hitEgg();
	eggObj.check();
	eggObj.continueHit()
})