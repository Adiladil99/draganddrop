<template>
  <div class="main">
    <div class="main__title">Drag&Drop board</div>
    <div class="main__functions">
      <button @click="show()">Create</button>
    </div>
    <div class="main__board">
      <div class="main__board__todo" v-for="(item, i) in datas" :key="i">
        <div class="main__board__todo-title">{{ item.title }}</div>
        <div class="main__board__todo__content">
          <div
            class="main__board__todo__content__items"
            v-for="(list, idx) in item.list"
            :key="idx"
            @click="show(list)"
            draggable="true"
            @dragstart="startDrag($event, list, i, item.title)"
            @drop="onDrop($event, i, list)"
            @dragover.prevent
            @dragenter.prevent
            @dragend="dragEnd()"
          >
            <div
              :class="'main__board__todo__content__items-item ' + list.class"
            >
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
    startDrag(evt, item, i, title) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("item", JSON.stringify(item));
      evt.dataTransfer.setData("itemID", i);
      this.datas.map((item, idx) => {
        idx == i
          ? null
          : item.list.push({
              title: `${title} > ${item.title}`,
              class: "hover",
            });
      });
    },
    onDrop(evt, i, list) {
      const itemParse = evt.dataTransfer.getData("item");
      const item = JSON.parse(itemParse);
      const itemID = evt.dataTransfer.getData("itemID");
      var findId;
      var a, b, c;
      if (itemID == i && list.id != item.id) {
        this.datas[i].list.map((elem, idx) => {
          if (elem.id == list.id) {
            a = idx;
          } else if (elem.id === item.id) {
            b = idx;
          }
        });
        c = this.datas[i].list[a];
        this.datas[i].list[a] = this.datas[i].list[b];
        this.datas[i].list[b] = c;
      } else if (itemID != i) {
        this.datas.map((elem) => {
          elem.list.forEach((byid, i) => {
            if (item.id == byid.id) {
              findId = byid;
              elem.list.splice(i, 1);
            }
          });
        });
        this.$store.dispatch("todoTypes", { findId, i });
      }
      this.datas.map((elem) => {
        elem.list.forEach((byid, i) => {
          byid.id == undefined ? elem.list.splice(i, 1) : null;
        });
      });
    },
    dragEnd() {
      this.datas.map((elem) => {
        elem.list.forEach((byid, i) => {
          byid.id == undefined ? elem.list.splice(i, 1) : null;
        });
      });
    },
  },
  created() {
    this.add(dataJson.data);
  },
};
</script>
<style lang="scss">
.hover {
  background: #e0eafc;
  font-size: 14px;
  font-weight: 500;
}
</style>
