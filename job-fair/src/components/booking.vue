<template>
<v-content>
    <v-container>
        <v-layout align-center justify-center>
            <v-flex class="grey lighten-4">
                <v-container>
                    <v-card class="rounded-xl" flat>
                        <v-form>
                            <div class="
                                d-flex
                                flex-column
                                align-center
                                ">
                                <v-flex mt-5>
                                    <v-img contain lazy-src="https://www.img.in.th/images/685712519a2fdd56cfd71e60cbc5bdc1.png" max-height="150" max-width="250" src="https://www.img.in.th/images/685712519a2fdd56cfd71e60cbc5bdc1.png"></v-img>
                                </v-flex>
                            </div>
                            <v-layout align-content-center style="color: #072a40;">
                                <v-flex class="d-flex align-center justify-center pa-4 mx-auto">
                                    <strong>
                                    เลือกวันเวลาเข้ารับบริการ <br>
                                    </strong>
                                </v-flex>
                            </v-layout>
                            <v-layout class="px-0" fluid>
                                <v-flex md3 class="d-flex align-center justify-center pa-4 mx-auto">
                                    <v-date-picker v-model="date" :events="arrayEvents" event-color="green lighten-1" min="2021-10-01" max="2021-10-30" locale="th" :allowed-dates="allowedDates"></v-date-picker>
                                </v-flex>
                            </v-layout>
                            <v-layout class="d-flex align-center justify-center pa-4 mx-auto" md12>
                                
                            </v-layout>

                            
                        </v-form>
                        <v-layout align-center justify-center>

                            

                            <v-data-table :headers="headers"  hide-default-footer :items="desserts" class="elevation-1">
                                    <template v-slot:top>
                                        <v-toolbar flat>
                                            <v-toolbar-title>ตารางนัด</v-toolbar-title>
                                            <v-divider class="mx-4" inset vertical></v-divider>
                                            <v-spacer></v-spacer>
                                            <v-dialog v-model="dialog" max-width="500px">
                                                <v-card>
                                                    <v-card-title>
                                                        <span class="text-h5">{{ formTitle }}</span>
                                                    </v-card-title>
                                                </v-card>
                                            </v-dialog>
                                            <v-dialog v-model="dialogDelete" max-width="500px">
                                                <v-card>
                                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                                        <v-spacer></v-spacer>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>

                                        </v-toolbar>
                                    </template>
                                    <template v-slot:item.actions="{ item }">
                                        <v-icon color="green" x-large class="mr-2" @click="editItem(item)">
                                            mdi-arrow-right-bold-circle
                                        </v-icon>
                                    </template>
                                    <template v-slot:no-data>
                                        <v-btn color="primary" @click="initialize">
                                            Reset
                                        </v-btn>
                                    </template>
                                </v-data-table>

                                </v-layout>
                    </v-card>
                </v-container>

            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    sync
} from "vuex-pathify";

export default {
    name: 'booking',
    data: () => ({
        dialog: false,
        dialogDelete: false,
        arrayEvents: ['2021-10-26', '2021-10-28', '2021-10-27'],
        headers: [{
                text: 'ช่วงเวลา',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {
                text: 'จำนวนว่าง',
                value: 'calories',
                sortable: false
            },
            {
                text: 'เลือก',
                value: 'actions',
                sortable: false
            },

        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },

    }),

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        ...mapState({
            page: store => store.getApi.page,
        }),
        ...sync("*"),
    },
    mounted() {},

    methods: {
        allowedDates(val) {
            console.log('close day', val)
            if (val == '2021-10-27') return false
            return true
        },
        initialize() {
            this.desserts = [{
                    name: '9.00-10.00',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                },
                {
                    name: '11.00-12.00',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                },
                {
                    name: '13.00-14.00',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                },
                {
                    name: '15.00-16.00',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                },
                {
                    name: '17.00-18.00',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                }
            ]
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
    },

}
</script>
