module.exports = async function (context, req) {
    if (req.query.id) {
        // IDで絞り込み
        const todo = context.bindings.inputDocument
            .filter(elm => elm.id === req.query.id && !elm.isDeleted)
            .map(elm => {
                return {
                    id: elm.id,
                    title: elm.title,
                    content: elm.content,
                    isChecked: elm.isChecked
                };
            });
        
        if (todo) {
            // 成功（200）
            context.res = {
                status: 200,
                body: todo
            };
        } else {
            // 失敗（404）
            context.res = {
                status: 404,
                body: "Not Found."
            };
        }
    } else {
        // 一覧
        context.res = {
            status: 200,
            body: context.bindings.inputDocument.filter(elm => !elm.isDeleted).map(elm => {
                return {
                    id: elm.id,
                    title: elm.title,
                    content: elm.content,
                    isChecked: elm.isChecked
                };
            })
        };
    }
};