const apiUrl = 'https://testserverlesswebappvue-funcapp.azurewebsites.net/todo';

new Vue({
    el: '#app',
    data: function () {
        return {
            items: [],
            newDialog: false,
            deleteDialog: false,
            newTitle: '',
            newContent: '',
            deleteTargetItem: null,
            deleteTargetIndex: null,
            titleRules: [
                v => !!v || 'Title is required',
            ],
            contentRules: [
                v => !!v || 'Content is required',
            ]
        }
    },
    mounted: function ()  {
        const self = this;
        axios.get(apiUrl).then(res => {
            self.items = res.data;
        });
    },
    methods: {
        onClickNewSave: async function() {
            if (this.newTitle && this.newContent) {
                await axios.post(apiUrl, {
                    title: this.newTitle,
                    content: this.newContent
                });

                // dialogを閉じる
                this.newDialog = false;

                // フォームクリア
                this.newTitle = '';
                this.newContent = '';

                axios.get(apiUrl).then(res => {
                    this.items = res.data;
                });
            }
        },
        onChangeCheckbox: function(item) {
            axios.put(`${apiUrl}/${item.id}`, {
                isChecked: item.isChecked
            });
        },
        onClickDeleteButton: function(item, index) {
            this.deleteDialog = true;
            this.deleteTargetItem = item;
            this.deleteTargetIndex = index;
        },
        onClickDeleteOK: function(item, index) {
            axios.delete(`${apiUrl}/${this.deleteTargetItem.id}`).then(() => {
                this.items.splice(this.deleteTargetIndex, 1);
                this.deleteDialog = false;
                this.deleteTargetItem = null;
                this.deleteTargetIndex = null;
            });
        },
        onClickDeleteCancel: function(item, index) {
            this.deleteDialog = false;
            this.deleteTargetItem = null;
            this.deleteTargetIndex = null;
        }
    }
});