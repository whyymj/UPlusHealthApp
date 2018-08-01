 <template>
     <div>
         <label for="">
             Take a photo
             <input id="file-input" type="file" accept="image/*" capture="camera" style="display: none" @change="uploadImage()">
         </label>
         <button @click="trigger()">scan</button>
         <img id="blah" src="" alt="your image" style="display: none"/>
     </div>
 </template>
 
 <script type="text/javascript">
 
     export default {
         name: 'test',
         data () {
             return {
 
             }
         },
         created () {
             console.log('coming')
         },
         mounted () {
             
         },
         methods: {
             uploadImage () {
                 this.readURL(document.getElementById("file-input"));
             },
             trigger () {
                //  document.getElementById('file-input').click();
                 let myPromise = new Promise((resolve, reject) => {
                     throw new Error('error')
                 }).then(val => {
                     console.log('val')
                 }).catch(e => {
                     console.log(e)
                 }).finally(() => {
                     console.log('444')
                 })
             },
             readURL (input) {
                 if (input.files && input.files[0]) {
                     const reader = new FileReader();
 
                     reader.onload = function (e) {
                         console.log(e.target.result)
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