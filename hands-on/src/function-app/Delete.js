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

        // 論理削除
        context.bindings.outputDocument = JSON.stringify({
            id: req.query.id,
            title: todo.title,
            content: todo.content,
            isChecked: todo.isChecked,
            isDeleted: true,
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
};