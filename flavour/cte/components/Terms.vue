<template>
  <Modal title="Terms & Conditions" @close="$emit('close')" :size="640" id="terms-modal">
    <template slot="body">
      <div id="agreement">
        <p style="margin-top:0">In order to register for <b>{{ name ? name : 'a course' }}</b>, you will have to accept the following terms and conditions:</p>
        <ul>
          <li>I am totally aware of Course Structure and am willing to register for the course after going through the handout thoroughly.</li>
          <li>I will make sure to complete all the minimum requirements to be fulfilled for the certification of the courses and only then, I will be eligible to collect the Certification of Completion from CTE.</li>
          <li>I am aware of the Course Fee as announced by the President of the CTE in Demo sessions.</li>
          <li>I agree not to indulge into any malpractice with regards to evaluation components.</li>
          <li>I agree to the terms and conditions of withdrawal refunds from a course(s) as explained by CTE Coordinator. </li>
          <li>In order to participate and register for the courses you must visit the CTE’s official website, and login using your BITS-ID.</li>
          <li>Any Issue regarding the course/registration/withdrawal or any other related issue to CTE should be notified to the CTE, not the instructors, which ordinary conditions will be considered viable only till first 3 classes of the respective course.
              The decision by the president of CTE will be taken as final in any dispute or contrary of the same.</li>
          <li>CTE will make all reasonable efforts to deliver the course as outlined in the handout of the respective course. However, CTE reserves the right to make reasonable amendments to the content and syllabus of a course when necessary.</li>
          <li>CTE reserves the right to cancel courses, if necessary, which could be due to unforeseeable circumstances or insufficient enrollment. In this instance, all tuition and fees paid for the course will be refunded.</li>
        </ul>
      </div>
    </template>
    <template slot="footer">
      <button class="primary" @click="$emit('ok')">I Agree</button>
      <button class="secondary" @click="$emit('close')">Discard</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Dialogs/Modal";

export default {
  name: "Terms",
  props: [ 'name' ],
  components: {
    Modal,
  },
};
</script>

<style lang="scss">
#terms-modal .modal-container {
  @media screen and (max-width: 640px){
    width: 100% !important;
  }
}
#agreement {
  min-height: 400px;
  @include fluidType(13px, 16px);
  line-height: 1.5em;
  li {
    margin: 5px 0;
  }
}
</style>
