let app = require("@/config");
uni.switchDashboard = function (checkPermission) {
	let page = "/iuc/index/index-";
	if (checkPermission("Organization.TwAdminUser")) {
		page += "tw";
	} else if (checkPermission("Organization.XSLHH")) {
		page += "xslhh"
	} else if (checkPermission("Organization.UnitAdminUser")) {
		page += "manager"; // 挂靠单位管理
	} else if (checkPermission("Organization.DepartAdminUser")) {
		page += "depart-manager"; // 社团管理
	} else if (checkPermission("Organization.TeacherAdmin")) {
		page += "teacher";
	} else if (checkPermission("Organization.Student")) {
		page += "student";
	} else {
		page = "/iuc/index/index";
	}
	
	uni.navigateTo({
		url: page
		// url: "uc/login/login"
	})
}

uni.toProfile = function () {
	uni.navigateTo({
		url: "/iuc/profile/profile"
	})
}