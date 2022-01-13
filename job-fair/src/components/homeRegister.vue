<template>
<v-content>
    <v-container>
        <v-layout justify-center>
            <v-flex  md4 lg3 class="grey lighten-4 rounded-xl">
                <v-container>
                    <v-card class="rounded-xl" flat>
                        <v-form>
                            <div class="
                      d-flex
                      flex-column
                      align-center
                      rounded-xl
                    ">
                                <v-flex mt-5>

                                </v-flex>
                            </div>

                            <v-layout mt-10>
                                <v-card color="basil">
                                    <v-tabs v-model="tab" prev-icon='$prev' grow>
                                        <v-tab v-for="item in items" :key="item.id">
                                            <div v-if="tab == 0">
                                                <v-icon v-if="item.id == 0" large color="colorIcon darken-5">
                                                    mdi-hammer-wrench
                                                </v-icon>
                                            </div>

                                            <div v-else>
                                                <v-icon v-if="item.id == 0" large color="colorIcon lighten-3">
                                                    mdi-hammer-wrench
                                                </v-icon>

                                            </div>

                                            <div v-if="tab == 1">
                                                <v-icon v-if="item.id == 1" large color="colorIcon darken-5">
                                                    mdi-account-cowboy-hat
                                                </v-icon>
                                            </div>
                                            <div v-else>
                                                <v-icon v-if="item.id == 1" large color="colorIcon lighten-3">
                                                    mdi-account-cowboy-hat
                                                </v-icon>
                                            </div>

                                            {{ item.name }}
                                        </v-tab>
                                    </v-tabs>

                                    <v-tabs-items v-model="tab">
                                        <v-tab-item v-for="item in items" :key="item.id">
                                            <v-card v-if="item.id == 0" flat>
                                                <v-layout mt-5 align-content-center style="color: #072a40;">
                                                    <v-flex class="d-flex align-center justify-center pa-4 mx-auto">
                                                        <strong>
                                                            เข้าสู่ระบบสำหรับผู้สมัครงาน
                                                        </strong>
                                                    </v-flex>
                                                </v-layout>
                                                <v-card-title class="text-center justify-center mt-5">

                                                    <v-flex mt-5 md12>
                                                        <v-text-field label="อีเมล/ชื่อผู้ใช้" placeholder="กรุณากรอก" outlined dense :counter="50" :maxlength="50" v-model="Email"></v-text-field>
                                                    </v-flex>
                                                    <v-flex mt-5 md12>
                                                        <v-text-field label="รหัสผ่าน" placeholder="กรุณากรอก" outlined dense :counter="50" :maxlength="50" v-model="Password"></v-text-field>
                                                    </v-flex>
                                                </v-card-title>

                                            </v-card>
                                            <v-card v-if="item.id == 1" flat>
                                                <v-layout mt-5 align-content-center style="color: #072a40;">
                                                    <v-flex class="d-flex align-center justify-center pa-4 mx-auto">
                                                        <strong>
                                                            เข้าสู่ระบบบริษัท
                                                        </strong>
                                                    </v-flex>
                                                </v-layout>
                                                <v-card-title class="text-center justify-center mt-5">
                                                    <v-flex mt-5 md12>
                                                        <v-text-field label="อีเมล/ชื่อผู้ใช้" placeholder="กรุณากรอก" outlined dense :counter="50" :maxlength="50" v-model="Email"></v-text-field>
                                                    </v-flex>
                                                    <v-flex mt-5 md12>
                                                        <v-text-field label="รหัสผ่าน" placeholder="กรุณากรอก" outlined dense :counter="50" :maxlength="50" v-model="Password"></v-text-field>
                                                    </v-flex>
                                                </v-card-title>
                                            </v-card>
                                            <v-layout justify-end>
                                             <v-btn href="vuetifyjs.com" class="primary--text" text>
                                                            ลืมรหัสผ่าน
                                              </v-btn>
                                            </v-layout>
                                            <v-layout align-center justify-center mb-12 mt-7>
                                                <v-layout align-center justify-center mb-12>
                                                    <v-flex md6 xs6 mt-5>
                                                        <v-btn @click="sumbit()" block depressed elevation="6" rounded x-large id="bottom">
                                                            เข้าสู่ระบบ
                                                        </v-btn>
                                                    </v-flex>
                                                </v-layout>
                                            </v-layout>
                                            <v-layout mt-5 align-content-center style="color: #072a40;">
                                                <v-flex class="d-flex align-center justify-center pa-2 mx-auto">
                                                    <strong>
                                                        ยังไม่ได้เป็นสมาชิก jobfair ?
                                                        <v-btn @click="nextRegister()" text class="info--text">
                                                            สมัคสมาชิก
                                                        </v-btn>
                                                        <!-- <strong  ></strong> -->
                                                    </strong>
                                                </v-flex>
                                            </v-layout>
                                        </v-tab-item>
                                    </v-tabs-items>
                                </v-card>
                            </v-layout>

                        </v-form>
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
    name: 'home',
    components: {

    },
    data: () => ({
        tab: null,
        items: [{
                name: 'หางาน',
                id: 0
            },
            {
                name: 'หาคน',
                id: 1
            }
        ],
        Email: '',
        Password: '',
    }),
    watch: {

    },
    computed: {
        ...mapState({
            page: store => store.getApi.page,
        }),
        ...sync("*"),
    },
    mounted() {},
    created() {},
    methods: {
        sumbit() {
          this.z = 'jobItems';
            console.log('test');
        },
        nextRegister(){
          this.z = 'applicationFrom';
        console.log('z',this.z);
        }
    },

}
</script>

<style scoped>
#bottom {
    height: 250 px;
    width: 100%;
    background: linear-gradient(141deg, #d39656 0%, #d39656 51%, #d39656 75%);
    color: white;
    opacity: 0.95;
}

/* Helper classes */
.basil {
    background-color: #FFFBE6 !important;
}

.basil--text {
    color: #356859 !important;
}
</style>
