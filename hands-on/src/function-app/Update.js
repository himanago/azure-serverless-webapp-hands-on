module.exports = async function (context, req) {
    if (req.query.id) {
        // IDで絞り込み
        const todo = context.bindings.inputDocument
            .filter(elm => elm.id === req.query.id)
            .map(elm => {
                return {
                    id: elm.id,
                    title: elm.title,
                    content: elm.content,
                    isChecked: elm.isChecked
                };
            })[0];

        if (todo) {
            context.bindings.outputDocument = JSON.stringify({
                id: req.query.id,
                title: req.body.title || todo.title,
                content: req.body.content || todo.content,
                isChecked: req.body.isChecked,
            });

            // 成功（200）
            context.res = {
                status: 200
            };
        } else {
            // 失敗（404）
            context.res = {
                status: 404,
                body: "Not Found."
            };
        }
    } else {
        // 失敗（400）
        context.res = {
            status: 404,
            body: "Bad Request."
        };
    }
};