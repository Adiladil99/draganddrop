<template>
  <div class="main">
    <div class="main__title">Drag&Drop board</div>
    <div class="main__functions">
      <button @click="show()">Create</button>
      {{ datas }}
    </div>
    <div class="main__board">
      <div
        class="main__board__todo"
        v-for="(item, i) in datas"
        :key="i"
        @drop="onDrop($event, i)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="main__board__todo-title">{{ item.title }}</div>
        <div class="main__board__todo__content">
          <div
            class="main__board__todo__content__items"
            v-for="(list, idx) in item.list"
            :key="idx"
            @click="show(list)"
            draggable="true"
            @dragstart="startDrag($event, list)"
          >
            <div class="main__board__todo__content__items-item">
              <p class="b16-600">{{ list.title }}</p>
              <p class="b14-400">
                {{ list.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalCard v-if="showModal" :data="modalData" @close="showModal = false" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ModalCard from "../components/ModalCard.vue";
import dataJson from "../assets/data/data.json";

export default {
  name: "HomePage",
  data() {
    return {
      showModal: false,
    };
  },
  components: { ModalCard },
  computed: {
    ...mapGetters({ datas: "getData" }),
  },
  methods: {
    show(list) {
      this.showModal = true;
      this.modalData = list;
    },
    add(data) {
      this.$store.dispatch("createData", data);
    },
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", JSON.stringify(item.id));
    },
    onDrop(evt, i) {
      const itemID = evt.dataTransfer.getData("itemID");
      var findId;
      this.datas.find((elem) => {
        elem.list.find((byid, i) => {
          if (itemID == byid.id) {
            findId = byid;
            elem.list.splice(i);
          }
        });
      });

      console.log(findId);
      this.$store.dispatch("todoTypes", { findId, i });
    },
  },
  created() {
    this.add(dataJson.data);
  },
};
</script>
<style lang=""></style>
