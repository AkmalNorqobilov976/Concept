<template>
  <admin-layout>
    <Delete
      @deleteRequest="deleteData()"
      @closeDelete="closeDelete"
      :isDelete="isDelete"
    />
    <v-row justify="center">
      <v-col>
        <v-card elevation="10">
          <v-card-title>
            Foydalanuvchilar
            <v-spacer></v-spacer>
            <v-row justify="end">
              <v-col cols="6">
                <v-text-field
                  outlined
                  dense
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Qidirish"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-btn :to="`${getUri()}/create`" color="success"
                  >Qo'shish</v-btn
                >
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="$store.state.users.users"
            :search="search"
          >
            <template v-slot:item="row">
              <tr >
                <td class="py-2">
                  
                  <v-img width="100" height="80" contain :src="$store.state.uploads + row.item.photo.path"></v-img>
                </td>
                <td>{{ row.item.firstname + " " + row.item.lastname }}</td>
                <td>{{ row.item.email }}</td>
                <td>{{ row.item.role }}</td>
                <td class="text-right">
                  <!-- <v-btn
                    height="35"
                    width="35"
                    color="blue lighten-2"
                    elevation="0"
                    fab
                    small
                    :to="`${getUri()}/${row.item._id}`"
                    ><v-icon size="20" color="white">mdi-eye</v-icon></v-btn
                  > -->
                  <v-btn
                    height="35"
                    width="35"
                    color="green lighten-2"
                    elevation="0"
                    fab
                    small
                    :to="`${getUri()}/update?id=${row.item._id}`"
                    ><v-icon size="20" color="white">mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    height="35"
                    width="35"
                    color="red lighten-2"
                    elevation="0"
                    fab
                    small
                    @click="openDelete(row.item._id)"
                    ><v-icon size="20" color="white"
                      >mdi-trash-can</v-icon
                    ></v-btn
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </admin-layout>
</template>

<script>
import adminLayout from "../../../components/adminLayout.vue";
import { deleteItem } from "../../../helpers/mixins/delete";
export default {
  middleware: "isAdmin",
  data:()=> ({
      headers: [
        {
          text: "Rasm",
          sortable: false,
          value: "",
        },
        {
          text: "FIO",
          value: 'lastname'
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Foydalanuvchi turi",
          value: "role"
        },
        { text: "", align: "right", sortable: false, value: "" },
      ],
  }),
  mixins: [deleteItem],
  methods: {
    deleteData() {
      this.deleteRequest('users/DELETE_ONE');
    },
  },
  components: { adminLayout },
  beforeCreate() {
    this.$store.dispatch("users/GET_ALL");
  },
};
</script>

