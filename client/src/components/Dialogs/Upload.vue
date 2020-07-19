<template>
  <Modal title="Upload" :size="640" @close="$emit('close')">
    <template slot="body">
      <form
        method="post"
        enctype="multipart/form-data"
        v-on:keydown.enter.prevent
      >
        <!-- <input name="name" type="text" placeholder="Name"> -->
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">
            Drag your file(s) here to begin<br />
            or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        </div>
      </form>
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="(item, index) in uploadedFiles" :key="index">
            <img
              :src="item.url"
              class="img-responsive img-thumbnail"
              :alt="item.originalName"
            />
          </li>
        </ul>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </template>
    <template slot="footer">
      <button class="primary" @click="submit">Save</button>
      <button class="secondary" @click="$emit('close')">Discard</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "../Dialogs/Modal.vue";
import axios from "axios";
import { getters, mutations } from "../../utils/store";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

const upload = (formData, course_id) => {
  const url = `/admin/courses/${course_id}/upload`;
  return (
    axios
      .post(url, formData)
      // get data
      .then((x) => x.data)
  );
  // add url field
  //.then(x => x.map(img => Object.assign({},
  //	img, { url: `${BASE_URL}/images/${img.id}` })));
};

export default {
  name: "Upload",
  components: {
    Modal,
  },
  props: {
    course_id: String,
    preset: Object,
  },
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "content",
    };
  },
  computed: {
    ...getters,
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  methods: {
    ...mutations,
    submit() {
      this.uploadBox.onSuccess(this.uploadedFiles);
      this.$emit("close");
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      upload(formData, this.course_id)
        .then((x) => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch((err) => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      // save it
      this.save(formData);
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<style lang="scss" scoped>
textarea,
input[type="text"] {
  border: 1px solid #ddd;
  width: 100%;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
