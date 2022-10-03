<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal__wrapper">
        <div class="modal__wrapper__container">
          <div class="modal__wrapper__container-top">
            <div>
              <img
                :src="require('@/assets/icons/close.png')"
                @click="$emit('close')"
              />
            </div>
            <div v-if="data">
              <img :src="require('@/assets/icons/edit.png')" @click="edit()" />
              <img
                :src="require('@/assets/icons/delete.png')"
                @click="remove($emit)"
              />
            </div>
          </div>
          <hr />
          <div class="modal__wrapper__container-main">
            <label>ID:</label>
            <input readonly placeholder="ID Card" v-model="id" type="text" />
            <label>Title:</label>
            <input
              name="input"
              :readonly="readonly"
              placeholder="Title"
              v-model.trim="title"
              type="text"
            />
            <label>Description:</label>
            <textarea
              name="textarea"
              :readonly="readonly"
              placeholder="Description"
              v-model.trim="description"
              type="text"
            />
            <button
              class="modal-default-button"
              type="submit"
              @click="createItem($emit)"
              v-if="!data"
            >
              Create
            </button>
            <div class="modal-buttons" v-else>
              <button
                class="modal-default-button"
                v-show="visible"
                @click="update($emit)"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  name: "ModalCard",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      id: this.data != undefined ? this.data.id : this.count,
      title: this.data != undefined ? this.data.title : null,
      description: this.data != undefined ? this.data.description : null,
      visible: false,
      readonly: this.data != undefined ? true : false,
    };
  },
  validations() {
    return {
      title: { required },
      description: { required, maxLength: maxLength(40) },
    };
  },
  computed: {
    ...mapGetters({ count: "getCounter", datas: "getData" }),
  },
  methods: {
    createItem($emit) {
      this.$store.dispatch("createItemToDo", {
        id: this.count,
        title: this.title,
        description: this.description,
      });
      this.$store.commit("setCounter");
      $emit("close");
    },
    edit() {
      this.visible = !this.visible;
      this.readonly = !this.readonly;
    },
    remove($emit) {
      this.datas.map((elem) => {
        elem.list.forEach((byid, i) => {
          if (this.id == byid.id) {
            elem.list.splice(i, 1);
          }
        });
      });
      $emit("close");
    },
    update($emit) {
      this.datas.map((elem) => {
        elem.list.forEach((byid) => {
          if (this.id == byid.id) {
            (byid.title = this.title), (byid.description = this.description);
          }
        });
      });
      $emit("close");
    },
  },
  props: {
    data: {
      type: Object,
    },
  },
};
</script>
<style lang="scss">
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  text-align: left;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  &__wrapper {
    display: table-cell;
    vertical-align: middle;
    &__container {
      width: 300px;
      margin: 0px auto;
      padding: 15px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;
      hr {
        width: 100%;
      }
      &-top {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          cursor: pointer;
          width: 36px;
          height: 36px;
        }
      }
      &-main {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: stretch;
        input {
          margin: 5px 0 15px 0;
          padding: 0;
          height: 40px;
        }
        input:read-only {
          background-color: #f5f5f5;
          border: none;
        }
        textarea {
          margin-bottom: 15px;
          padding: 5px;
          height: 80px;
          resize: none;
          overflow-x: hidden;
        }
        textarea:focus,
        input:focus {
          outline: none;
        }

        .modal-default-button {
          background: white;
          width: 150px;
          height: 50px;
          border: none;
          box-shadow: 0px 0px 6px 0px rgba(34, 60, 80, 0.25);
          &:hover {
            cursor: pointer;
            box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.35);
          }
        }
      }
    }
  }
}
</style>
