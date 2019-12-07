<template lang="pug">
    <div id='main'>
        <form>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                    <input type="text" v-model='title' class="form-control" id="inputTitle">
                </div>
            </div>
        </form>
        .simple-editor
        .editor-node(ref="editorNode" v-model='editorContent')
        <section id="preview">
            <h1>{{title}}</h1>
            <div v-html="editorContent"></div>
        </section>
        
        <button type="button" v-on:click="sentPost" class="btn btn-primary mt-2">POST!</button>
    </div>
</template>


<script>
import Quill from 'quill'
import axios from '../../api/server';

export default {
  props: {
    value: {
      default: '',
      type: String
    }
  },

    data () {
        return {
            title: '',
            editorContent: null,
            editorInstance: null,
            editorOpts: {
                modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['clean'],
                    ['link', 'image', 'video'],
                    [{ 'direction': 'rtl' }]
                ]
                },
                theme: 'snow'
            }
        }
    },
    watch: {
        value (newVal) {
        // Only update the content if it's changed from an external source
        // or else it'll act weird when you try to type anything
            if (newVal !== this.editorContent) {
                this.editorInstance.pasteHTML(newVal)
            }
        }
    },

    mounted () {
        this.initializeEditor()
    },

    beforeDestroy () {
        // Turn off all listeners set on text-change
        this.editorInstance.off('text-change')
    },

    methods: {
        sentPost: function(){
            axios
                .post('/article', {
                    title: this.title,
                    content: this.editorContent
                })
                .then(({data})=> {
                    Swal.fire(
                        'Success!',
                        'Article Posted!',
                        'success'
                    )
                    this.$emit('pagecontrol', 'explore')
                })
                .catch(err=> {
                    let fields = err.response.data.join(' | ')
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: fields
                    })
                })
        },
        initializeEditor () {
        // Set initial content that's going to be picked up by Quill
        this.$refs.editorNode.innerHTML = this.value
        // Create the Quill instance
        this.editorInstance = new Quill(this.$refs.editorNode, this.editorOpts)
        // Setup handler for whenever things change inside Quill
        this.editorInstance.on('text-change', this.onEditorContentChange)
        // Save any initial content to this.editorContent
        this.setEditorContent()
        },
        onEditorContentChange () {
        // Whenever we change anything, update this.editorContent
        this.setEditorContent()
        // Then emit its value as input so we have a working v-model
        // This $emit will be catched up in the watch:value
        // that's why we guard against calling pasteHTML
        // calling that function while we are typing is undesirable
        this.$emit('input', this.editorContent)
        },
        setEditorContent () {
        this.editorContent = this.editorInstance.getText().trim()
            ? this.editorInstance.root.innerHTML
            : ''
        }
    }
}
</script>


<style lang="sass">
@import 'quill/dist/quill.snow.css'
</style>
<style scoped>
h1 {
    margin-top: 1rem;
    display: flex;
    justify-content: center
}
#preview {
    overflow: scroll;
    margin-top: 50px;
    border: 2px solid grey;
    background-color: snow;
    height: 300px;
    padding-bottom: 10px;
    border-radius: 2rem;
    
}
#main {
    padding-right: 250px;
    padding-left: 250px
}
</style>