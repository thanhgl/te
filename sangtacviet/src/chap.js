function execute(url) {
    var doc = Http.get(url + "/").html();
    var html = doc.html();

    var bookId = html.match(/bookid=(\d+);/);
    if (bookId) bookId = bookId[1];

    var bookHost = html.match(/bookhost=\"(.*?)\";/);
    if (bookHost) bookHost = bookHost[1];

    var currentidc = html.match(/currentidc=\"(.*?)\";/);
    if (currentidc) currentidc = currentidc[1];

    var currentid = html.match(/currentid=\"(.*?)\";/);
    if (currentid) currentid = currentid[1];

    var booksty = html.match(/booksty=(\d+);/);
    if (booksty) booksty = booksty[1];
    var newUrl = 'https://sangtacviet.com/index.php?sajax=readchapter&bookid='+bookId+'&h='+bookHost+'&c='+currentid
    var data = Http.get(newUrl.replace(/&amp;/g, "&")).string();

    var json = JSON.parse(data);

    var htm = json["data"];
    var info = json["info"];
    var err = json["err"];
    if (htm) {
        var chapterName = json["chaptername"];
        htm = htm.replace(/&(nbsp|amp|quot|lt|gt);/g, "");
        htm = htm.replace(/(nbsp|amp|quot|lt|gt|bp);/g, "");
        htm = htm.replace("@Bạn đang đọc bản được lưu trong hệ thống", "");
        htm = htm.replace(/<\/?i.*?>/g, "");
        htm = htm.replace(/\s{2,}/g, " ");
        htm = htm.replace(/<div\s+class="ad_content">[\S\s]*?<\/div>/gi, " ");
        return Response.success(htm, chapterName);
    } else if (info) {
        return Response.error(info);
    } if (err) {
        return Response.error(err);
    }
}