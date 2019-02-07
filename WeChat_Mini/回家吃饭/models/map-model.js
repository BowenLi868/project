var e = {
    getSharePageByUrl: function(e) {
        var a = "share/", t = /(newuser\/)(.*?)(\/app|$)/, i = /(redpacket\/index\/)(.*?)(\/web\/current\/)(.*?)(\/app|$)/, r = /(dandelion\/web\/invite_code\=)(.*?)(&)/, n = /(eventsoperation\/index\/home\/)(.*?)(\/app|$)/, c = void 0;
        return (c = e.match(t)) ? a + "exclusive/exclusive?shareName=" + c[2] : (c = e.match(i)) ? a + "packet/packet?shareName=" + c[2] + "&shareKey=" + c[4] : (c = e.match(r)) ? a + "dandelion/dandelion?inviteCode=" + c[2] : (c = e.match(n)) ? a + "activity/activity?shareName=" + c[2] : "";
    }
};

module.exports = e;