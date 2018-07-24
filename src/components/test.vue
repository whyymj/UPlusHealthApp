<template>
    <div>
        <div v-for="(a, index) in arr" :key="index" style="width: 200px; height: 200px; background-color: red; display: inline-flex" @keyup.right="alert(a)">
            {{ a.name }}
        </div>


<p><img src="https://huiai.sleepeazz.com/qares/mh/cartoon3_0.jpg" class="img"/><img src="https://huiai.sleepeazz.com/qares/mh/cartoon3_1.jpg" class="img"/><img src="https://huiai.sleepeazz.com/qares/mh/cartoon3_2.jpg" class="img"/><img src="https://huiai.sleepeazz.com/qares/mh/cartoon3_3.jpg" class="img"/><img src="https://huiai.sleepeazz.com/qares/mh/cartoon3_4.jpg" class="img"/><img src="https://huiai.sleepeazz.com/qares/mh/cartoon3_5.jpg" class="img"/><img src="https://huiai.sleepeazz.com/qares/mh/cartoon3_6.jpg" class="img"/></p><p><img src="https://huiai.sleepeazz.com/qares/images/footer.jpg"/></p>
    </div>
</template>

<script type="text/javascript">
    import VueCropper from 'vue-cropperjs'
    import Tesseract from 'tesseract.js'
    import axios from 'axios'

    export default {
        name: 'test',
        data () {
            return {
                imgSrc: '',
                cropImg: '',
                arr: [
                    {
                        id: 1,
                        name: 'a'
                    },
                    {
                        id: 2,
                        name: 'b'
                    },
                    {
                        id: 3,
                        name: 'c'
                    }
                ]
            }
        },
        created () {
            document.onkeydown = function (e) {
                console.log(e)
            }
        },
        mounted () {
        },
        methods: {
            alert (arg) {
                alert(arg.name)
            },
             setImage (e) {
                const file = e.files[0];

                if (!file.type.includes('image/')) {
                    alert('Please select an image file');
                    return;
                }

                if (typeof FileReader === 'function') {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        this.imgSrc = event.target.result;
                        // rebuild cropperjs with the updated source
                        this.$refs.cropper.replace(event.target.result);
                        this.$refs.cropper.$el.style = 'display: block'
                    };

                    reader.readAsDataURL(file);
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            },
            cropImage () {
                console.log('crop image...')
                // get image data for post processing, e.g. upload or setting image src
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                this.$refs.cropImg.style = 'display: block;width: 200px; height: 150px; border: 1px solid gray;'
                
            },
            recognize () {
                console.log('reco....')
                Tesseract.recognize(this.$refs.cropImg, {
                    lang: 'eng',
                    tessedit_char_whitelist: '0123456789.',
                    tessedit_char_blacklist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
                    tessedit_dump_choices: '0123456789.'
                })
                .then(function(result){
                    console.log(result)
                })
            },
            uploadImage () {
                this.setImage(document.getElementById("file-input"));
            },
            trigger () {
                document.getElementById('file-input').click();
            },
            readURL (input) {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();

                    reader.onload = function (e) {
                        document.getElementById('blah').src = e.target.result;
                        document.getElementById('blah').style = 'display: block;';
                        
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
