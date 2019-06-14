module.exports = async function (context, req) {
    if (req.body.title && req.body.content) {
        // リクエスト本文をそのまま格納
        context.bindings.outputDocument = req.body;

        // 成功（200）
        context.res = {
            status: 200
        };
    } else {
        // 失敗（400）
        context.res = {
            status: 400,
            body: "The query options 'title' and 'content' are required."
        };
    }
};