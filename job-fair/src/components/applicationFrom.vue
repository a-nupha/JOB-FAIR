<template>
<v-content>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 md5 lg6 class="grey lighten-4 rounded-xl">
                <v-container>
                    <v-card class="rounded-xl" flat>
                        <v-form>
                            <div class=" d-flex flex-column align-center">
                            </div>
                            <v-layout style="color: #072a40;">
                                <v-flex class="d-flex align-center justify-center pa-4 mx-auto">
                                    <strong>
                                        ลงทะเบียนข้อมูลผู้สมัครับงาน
                                    </strong>
                                </v-flex>
                            </v-layout>

                            <v-layout mt-5 align-center justify-center>
                                <!-- <v-container fluid > -->
                                <v-card ref="form">
                                <v-col md="10" xs="12">
                                    <v-flex>
                                        <v-text-field
                                        ref="userNameModel"
                                        required
                                        v-model="userNameModel"
                                        :label="userNameLabel"
                                        :placeholder="userNamePlaceholder"
                                        outlined dense
                                        :counter="userNameCounter"
                                        :maxlength="userNameMaxlength"
                                        @blur="handleUpdateItem($event)"
                                        :rules="[rules.required, rules.minId, rules.requiredTimEmty]"
                                        />

                                        <v-text-field
                                        ref="userPasswordModel"
                                        :label="userPasswordLabel"
                                        :placeholder="userPasswordPlaceholder"
                                        outlined dense
                                        :counter="userPasswordCounter"
                                        :maxlength="userPasswordMaxlength"
                                        v-model="userPasswordModel"
                                        :rules="[rules.required, rules.minPassword]"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show1 ? 'text' : 'password'"
                                          hint="At least 8 characters"
                                        @click:append="show1 = !show1"
                                        />

                                        <v-text-field
                                        ref="name"
                                        :label="firstNameLabel" 
                                        :placeholder="firstNamePlaceholder" 
                                        outlined dense 
                                        :rules="firstNameRules" 
                                        :counter="firstNameCounter" 
                                        :maxlength="firstNameMaxlength" 
                                        v-model="firstNameModel"/>
                                        
                                        <v-text-field 
                                        :label="lastNameLabel" 
                                        :placeholder="lastNamePlaceholder" 
                                        outlined dense 
                                        :counter="lastNameCounter" 
                                        :rules="lastNameRules" 
                                        :maxlength="lastNameMaxlength" 
                                        v-model="lastNameModel"/>

                                       
                                        <v-text-field 
                                        :label="pidLabel" 
                                        :placeholder="pidPlaceholder" 
                                        v-mask="'#-####-#####-##-#'" 
                                        outlined dense :maxlength="17" 
                                        :rules="[rules.chcekPid]"
                                        
                                        @blur="checkDigitId(pidModel)"
                                        v-model="pidModel">
                                        </v-text-field>


                                            <v-flex md12>
                                                <div>
                                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                            :label="birthDayLabel"
                                                            :placeholder="birthDayPlaceholder" 
                                                            v-model="birthDayModel"
                                                            locale="th"
                                                            :role="birthDayrules"
                                                            readonly outlined dense
                                                            v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker locale="th" 
                                                        v-model="birthDayModel" 
                                                        :active-picker.sync="activePicker" 
                                                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01" @change="save"></v-date-picker>
                                                    </v-menu>
                                                </div>
                                            </v-flex>
                                        

                                        <v-flex md12>
                                            <v-text-field 
                                            :label="phoneLabel" 
                                            :placeholder="phonePlaceholder" 
                                            outlined dense 
                                            :rules="phonerules" 
                                            :counter="phoneCounter" 
                                            :maxlength="phoneMaxlength" 
                                            v-model="phoneModel"/>
                                        </v-flex>

                                        <v-flex md12>
                                            <v-text-field
                                            :label="ageLabel"
                                            :placeholder="agePlaceholder" 
                                            outlined dense
                                            :rules="agerules"
                                            :counter="ageCounter"
                                            :maxlength="ageMaxlength"
                                            v-model="ageModel"/>
                                        </v-flex>



                                        <v-layout>
                                        <v-flex md5 xs5 lg5>
                                            <v-text-field 
                                            :label="address1Label"
                                            outlined dense 
                                            :rules="address1rules"
                                            :counter="address1Counter" 
                                            :maxlength="address1Maxlength"
                                            v-model="address1Model"/>
                                        </v-flex>

                                        <v-flex md7 xs7 lg7>
                                            <v-text-field
                                            :label="address2Label"
                                            prepend-icon=" "
                                            outlined dense
                                            :rules="address2rules"
                                            :counter="address2Counter"
                                            :maxlength="address2Maxlength"
                                            v-model="address2Model"/>
                                            
                                        </v-flex>
                                        </v-layout>

                                        <v-flex md12>
                                            <ThailandAutoComplete
                                            v-model="zipcode"
                                            type="zipcode"
                                            @select="select"
                                            :placeholder="placeholderZipcode" />
                                        </v-flex>

                                        <v-flex md12 style="color: #0277bd;" class="d-flex align-left justify-left pa-1 mx-auto">
                                            <div v-if="zipcode">
                                                ที่อยู่ :{{province.indexOf('กรุงเทพมหานคร') == 0 ? 'แขวง' : 'ตำบล:'}} {{district}} {{province.indexOf('กรุงเทพมหานคร') == 0 ? 'เขต:' : 'อำเภอ:'}} {{amphoe}} {{province.indexOf('กรุงเทพมหานคร') == 0 ? '' : 'จังหวัด:'}} {{province}}
                                            </div>
                                        </v-flex>

                                        <v-flex md12>
                                            <v-text-field 
                                            :label="emailLable"
                                            :placeholder="emailPlaceholder"
                                             outlined dense :rules="emailRules" 
                                            :counter="emailCounter"
                                            :maxlength="emailMaxlength"
                                            v-model="emailModel"/>
                                        </v-flex>


                                         <v-flex md12>
                                             <v-autocomplete
                                                v-model="educationModel"
                                                :items="educationalItems"
                                                :rules="[() => !!educationModel || 'กรุณาเลือก']"
                                                outlined
                                                dense
                                                :label="educationLable"
                                            ></v-autocomplete>

                                        </v-flex>
                                        <v-flex md12>
                                             <v-autocomplete
                                                v-model="jobModel"
                                                :items="jobitems"
                                                outlined
                                                dense
                                                chips
                                                small-chips
                                                :label="jobLable"
                                                :rules="[() => !!jobModel || 'กรุณาเลือก']"
                                                multiple
                                            ></v-autocomplete>
                                        </v-flex>


                                    <v-layout align-content-center style="color: #072a40;">
                    <v-flex  class="d-flex align-center justify-center pa-4 mx-auto" >
                    <strong>
                    ข้อกำหนดและเงือนไขการลงทะเบียน
                    </strong>
                    </v-flex>
                  </v-layout>

                    <v-layout mt-10>
                    <v-flex class="d-flex align-center justify-center pa-4 mx-auto" >
                    <v-col
                      cols="12"
                      xs="12"
                      md="12"
                     >
                      <v-textarea
                       no-resize
                        rows="7"
                        filled
                        label="ความยินยอม"
                        :value="policyText"></v-textarea>
                    </v-col>
                    </v-flex>
                  </v-layout>

                   <v-layout align-center justify-center>
                    <v-radio-group v-model="policyValue" row>
                      <v-radio label="ยอมรับ" :value="true"></v-radio>
                      <v-radio label="ไม่ยอมรับ" :value="false"></v-radio>
                    </v-radio-group>
                   </v-layout>
                                    </v-flex>
                                </v-col>
                                   </v-card>
                                <!-- </v-container> -->
                            </v-layout>

                        </v-form>
                        <v-layout mt-5 align-center justify-center>
                            <v-flex ma-2 mt-5 mb-2 md4 xs6>
                                <v-btn block depressed @click="back()" elevation="6" rounded x-large color="primary">
                                    ย้อนกลับ
                                </v-btn>
                            </v-flex>
                            <v-flex ma-2 mt-5 mb-2 md4 xs6>
                                <v-btn block depressed @click="submitForm()" elevation="6" rounded x-large color="primary">
                                    ยอมรับ
                                </v-btn>
                            </v-flex>
                        </v-layout>

                    </v-card>
                </v-container>
            </v-flex>
        </v-layout>

    </v-container>
</v-content>
</template>

<script>
// import dateGlobal from '../components/GlobalDate.vue'
import {
    mapState
} from "vuex";
import {
    sync
} from "vuex-pathify";
import ThailandAutoComplete from 'vue-thailand-address-autocomplete'
import functions from '../plugins/functions'

export default {
    name: "applicationFrom",
    components: {
        ThailandAutoComplete
    },

    computed: {
        ...mapState({
            page: store => store.getApi.page,
        }),
        ...sync("*"),
        form () {
            return {
                userNameModel: this.userNameModel,
                userPasswordModel:this.userPasswordModel,
            }
        },
    },

    data: () => ({
        userNameLabel:'user name',
        userNamePlaceholder:'กรุณากรอก user name',
        userNameCounter:50,
        userNameMaxlength:50,
        userNameModel:'',

        userPasswordLabel:'user password',
        userPasswordPlaceholder:'กรุณากรอก user password',
        userPasswordCounter:20,
        userPasswordMaxlength:20,
        userPasswordModel:'',
        show1: false,
        rules: {
                required: value => !!value || 'กรุณาระบุ.',
                requiredTimEmty: value => value.indexOf(" ") < 0 || 'ห้ามมีช่องว่าง',
                minId: v => v.length >= 8 || 'ระบุอย่างน้อย 8 ตัวอักษร',
                minPassword: v => v.length >= 8 || 'ระบุอย่างน้อย 8 ตัวอักษร์',
                chcekPid: value => functions.checkPID(value) || 'เลขบัตรประชาชนไม่ถูกต้อง',
                },

        firstNameLabel:'ชื่อ',
        firstNamePlaceholder:'กรุณากรอก ชื่อ',
        firstNameCounter:50,
        firstNameMaxlength:50,
        firstNameModel:'',
        firstNameRules: [
                        value => !!value || 'กรุณากรอก ชื่อ',
                        value => (value && value.length <= 50) || 'ไม่เกิณ 50 ตัวอักษร์',
                    ],


        lastNameLabel:'นามสกุล',
        lastNamePlaceholder:'กรุณากรอก นามสกุล',
        lastNameCounter:50,
        lastNameMaxlength:50,
        lastNameModel:'',
        lastNameRules: [
                        value => !!value || 'กรุณากรอก นามสกุล',
                        value => (value && value.length <= 50) || 'ไม่เกิณ 50 ตัวอักษร์',
                    ],

        pidLabel:'เลขประจำตัวประชาชน',
        pidPlaceholder:'กรุณากรอกเลขประจำตัวประชาชน',
        pidCounter:20,
        pidMaxlength:20,
        pidModel:'',
        pidrules: [
                        value => !!value || 'กรุณากรอกเลขประจำตัวประชาชน',
                        value => (value && value.length <= 17) || 'ไม่เกิณ 17 ตัวอักษร์',
                    ],


        birthDayLabel:'วันเดินปีเกิด',
        birthDayPlaceholder:'กรุณากรอกวันเดินปีเกิด',
        birthDayModel:'',
        birthDayrules:[
                    value => !!value || 'กรุณากรอกวันเดินปีเกิด',
                ],

        phoneLabel:'เบอร์โทรศัพท์',
        phonePlaceholder:'กรุณากรอกเบอร์โทรศัพท์',
        phoneModel:'',
        phoneCounter:10,
        phoneMaxlength:10,
        phonerules:[
                    value => !!value || 'กรุณากรอกเบอร์โทรศัพท์',
                    value => !!value || 'กรุณากรอกเบอร์โทรศัพท์',
                
                ],


        ageLabel:'อายุ',
        agePlaceholder:'กรุณากรอกอายุ',
        ageModel:'',
        ageCounter: 2,
        ageMaxlength: 2,
        agerules:[
                    value => !!value || 'กรุณากรอกอายุ',
                ],

        zipcode: '',
        zipcodeCounter: 5,
        zipcodeMaxlength: 5,
        placeholderZipcode: 'รหัสไปรษณีย์',

        address1Label:'บ้านเลขที่',
        address1Placeholder:'กรุณากรอกบ้านเลขที่',
        address1Model:'',
        address1Counter: 20,
        address1Maxlength: 20,
        address1rules:[
                value => !!value || 'กรุณากรอกบ้านเลขที่',
                 ],

        address2Label:'',
        address2Placeholder:'กรุณากรอก ซอย/ถนน',
        address2Model:'',
        address2Counter: 50,
        address2Maxlength: 50,
        address2rules:[
                value => !!value || 'กรุณากรอก ซอย/ถนน',
                 ],

        

        emailLable: 'อีเมลย์',
        emailPlaceholder: 'กรุณากรอก อีเมลย์',
        emailCounter: 255,
        emailMaxlength: 255,
        emailModel: '',
        emailRules: [
                value => !!value || 'กรุณากรอก อีเมลย?',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'ระบุ E-mail ไม่ถูกต้อง'
                     ],

        educationLable:'วุฒิการศึกษา',
        educationModel:'',
        educationalItems:['ปริญญาเอก',
                    'ปริญญาโท',
                    'ปริญญาตรี',
                    'อนุปริญญา',
                    'ปวส',
                    'ปวท',
                    'ปวช',
                    'มัธยมศึกษาตอนปลาย',
                    'มัธยมศึกษาตอนต้น',
                    'ต่ำกว่ามัธยมศึกษา'
        ],


        selected: [],
        jobLable:'ลักษณะงาน',
        jobitems: ['กฎหมาย',
                'การตลาด',
                'เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่',
                'ขาย',
                'เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม',
                'คอมพิวเตอร์/IT/โปรแกรมเมอร์',
                'งานการเงิน-ธนาคาร',
                'งานขนส่ง-คลังสินค้า',
                'งานนำเข้า-ส่งออก',
                'งานบริการลูกค้า-Call Center',
                'งานบัญชี',
                'งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume',
                'จัดซื้อ/ธุรการ/ประสานงานทั่วไป',
                'เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO',
                'ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์',
                'นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา',
                'บุคคล/ฝึกอบรม',
                'ผลิต/ควบคุมคุณภาพ/โรงงาน',
                'ผู้จัดการ/ผู้อำนวยการ/MD/CEO',
                'แผนกรักษาความปลอดภัย/งานอาคารจอดรถ',
                'แพทย์/เภสัชกร/สาธารณสุข',
                'ภูมิศาสตร์/แผนที่/GIS/ผังเมือง',
                'แม่บ้าน/พี่เลี้ยง/คนสวน',
                'โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา',
                'ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว',
                'เลขานุการ',
                'วิทยาศาสตร์/Lab/วิจัยพัฒนา',
                'วิศวกร',
                'วิจัย / วิเคราะห์ ( เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร )',
                'ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ',
                'ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์',
                'สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์',
                'สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา',
                'เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น',
                'ออกแบบเว็บไซต์/Web',
                'อัญมณีและเครื่องประดับ',
                'อาจารย์/ครู/งานวิชาการ',
                'อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ',
                'อื่นๆ',
                'งาน Part-time/พนักงานชั่วคราว',
                'Freelance'],
        jobModel: [],
        
        date: null,
        menu: false,
        district: '',
        amphoe: '',
        province: '',
        activePicker:'',
        policyText: "1. คำแถลงว่าด้วยการคุ้มครองข้อมูลส่วนบุคคล1.1. นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (“นโยบายคุ้มครองข้อมูลส่วนบุคคล”) อธิบายวิธีการที่บริษัท มิตซูบิชิ มอเตอร์ส (ประเทศไทย) จำกัด (ซึ่งต่อไปนี้จะเรียกว่า “MMTh” “เรา” หรือ “ของเรา”) เก็บรวบรวม ใช้ เก็บรักษา เปิดเผย และ/หรือ โอนไปยังต่างประเทศ ซึ่งข้อมูลส่วนบุคคลของลูกค้าในปัจจุบันและอนาคต (“คุณ” หรือ “ของคุณ”) (ตามที่นิยามไว้ในนโยบายนี้) โดยมีวัตถุประสงค์เพื่อคุ้มครองความเป็นส่วนตัวของข้อมูลส่วนบุคคลของคุณ1.2. นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ใช้กับช่องทางการสื่อสารทั้งออนไลน์หรือออฟไลน์ที่เราเก็บรวบรวมข้อมูลส่วนบุคคลของคุณ ไม่ว่าทางต่อหน้า ผ่านศูนย์บริการ โรงงาน สถานที่ประกอบกิจการของเรา งานกิจกรรม หรือ ทางโทรศัพท์ผ่านศูนย์บริการข้อมูลลูกค้า (call center) หรือทางออนไลน์ ผ่านทางอีเมล หรือแพลตฟอร์มโซเชียลมีเดีย (เช่น เว็บเพจ Facebook หรือ Line) และช่องทางอื่นๆ ที่เกี่ยวกับการจัดหาผลิตภัณฑ์และบริการให้แก่คุณ รวมถึงการใช้แอปพลิเคชัน Smartphone Link Gateway for M Connect) และ/หรือแอปพลิเคชันอื่นๆ (“แอปพลิเคชัน”) เว็บไซต์ของเรา https://www.mitsubishi-motors.co.th/th และ/หรือเว็บไซต์อื่นๆ (“เว็บไซต์”) และปฏิสัมพันธ์อื่นๆ ระหว่างคุณกับเรา (ซึ่งต่อไปนี้จะรวมเรียกกันว่า “ช่องทางการสื่อสาร”)1.3. เพื่อให้บรรลุวัตถุประสงค์ของนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ “ข้อมูลส่วนบุคคล” หมายถึงข้อมูลส่วนบุคคลหรือข้อมูลที่สามารถระบุตัวตนได้ตามที่นิยามไว้ในกฎหมายที่ใช้บังคับ ซึ่งรวมถึงข้อมูลส่วนบุคคลที่มีความละเอียดอ่อน (ตามที่นิยามไว้ในนโยบายนี้)1.4. MMTh มีความมุ่งมั่นในการดำเนินการเพื่อให้มั่นใจว่าความเป็นส่วนตัวของคุณจะได้รับความคุ้มครอง และการประมวลผลข้อมูลส่วนบุคคลของคุณจะเป็นไปตามกฎหมายและข้อบังคับที่เกี่ยวข้อง (ซึ่งอาจมีการแก้ไขเพิ่มเติมและมีการออกกฎหมายใหม่ใช้บังคับแทนเป็นครั้งคราว) เพื่อคุ้มครองข้อมูลส่วนบุคคลในประเทศที่เราเข้าไปและมุ่งหมายจะเข้าไปดำเนินธุรกิจ (“กฎหมายที่ใช้บังคับ”) MMTh จะเก็บรวบรวม ใช้ เก็บรักษา เปิดเผย และโอนไปยังต่างประเทศซึ่งข้อมูลส่วนบุคคลของคุณตามนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้เท่านั้น1.5. โปรดอ่านเนื้อหาต่อไปนี้อย่างระมัดระวังเพื่อทำความเข้าใจมุมมองและการปฏิบัติของ MMTh เกี่ยวกับข้อมูลส่วนบุคคลของคุณและวิธีการที่เราจะประมวลผลข้อมูลดังกล่าว ข้อมูลบางประการเกี่ยวกับคุณมีความจำเป็นสำหรับการจัดหาผลิตภัณฑ์และบริการให้แก่คุณ หากคุณไม่ตกลงที่จะให้ข้อมูลดังกล่าว เราจะไม่สามารถจัดหาผลิตภัณฑ์และบริการให้แก่คุณ และคุณจะไม่สามารถใช้หรือเข้าถึงฟังก์ชั่นและการใช้งานของบริการและผลิตภัณฑ์ของเราทั้งหมดได้1.6. โดยทั่วไปแล้วกิจกรรมของเรา (ซึ่งรวมถึงการให้บริการ และการจำหน่ายผลิตภัณฑ์) ไม่มุ่งเน้นที่ผู้เยาว์ คนเสมือนไร้ความสามารถ หรือคนไร้ความสามารถ ดังนั้น หากคุณมีอายุต่ำกว่า 20 ปี หรือยังไม่บรรลุนิติภาวะตามที่กำหนดในประเทศที่คุณอาศัยอยู่ เป็นคนเสมือนไร้ความสามารถ เป็นคนไร้ความสามารถ (แล้วแต่กรณี) เว้นแต่จะมีสิทธิตามกฎหมาย และคุณต้องการใช้บริการของเรา ใช้แอปพลิเคชันของเรา หรือบริการอื่นๆ จากเรา คุณจะต้องได้รับความยินยอมจากผู้ปกครองหรือผู้แทนโดยชอบธรรมก่อนติดต่อเราหรือก่อนให้ข้อมูลส่วนบุคคลแก่เรา เราไม่เก็บรวบรวมข้อมูลส่วนบุคคลหากเราทราบอยู่แล้วว่าข้อมูลดังกล่าวเป็นข้อมูลของผู้เยาว์ที่อายุน้อยกว่า 20 ปีโดยไม่ได้รับความยินยอมจากผู้ปกครองตามที่กฎหมายกำหนด หรือเป็นของคนเสมือนไร้ความสามารถหรือคนไร้ความสามารถโดยไม่ได้รับความยินยอมจากผู้พิทักษ์หรือผู้อนุบาลตามกฎหมาย1.7. นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ได้รับการปรับปรุงครั้งล่าสุดเมื่อ 20 เมษายน พ.ศ. 2563 MMTh สงวนสิทธิ์ โดยมีดุลยพินิจแต่เพียงผู้เดียว ในการปรับเปลี่ยน แก้ไข ลบ และปรับปรุงนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้เป็นครั้งคราว MMTh จะใช้ความพยายามตามสมควรเพื่อแจ้งให้คุณทราบและในลักษณะที่เหมาะสมถึงการปรับเปลี่ยนข้อกำหนดใดของนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (เช่น โดยส่งนโยบายที่แก้ไขให้คุณทางอีเมล หรือโดยประกาศการเปลี่ยนแปลงดังกล่าวในช่องทางการสื่อสารของเรา) หากการเปลี่ยนแปลงใดๆ ของนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ต้องได้รับความยินยอมจากคุณตามกฎหมายที่ใช้บังคับ เราจะขอความยินยอมจากคุณเพื่อให้สอดคล้องกับการเปลี่ยนแปลงดังกล่าว",
        policyValue: true,
        formHasErrors: false,
    }),


    mounted() {

    },
    created() {
        this.CheckLanuage();
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },

    methods: {
        save(date) {
            this.$refs.menu.save(date)
        },
        handleUpdateItem(){
            console.log('check USER even: on-blur')
        },
        select(address) {
            this.district = address.district
            this.amphoe = address.amphoe
            this.province = address.province
            this.zipcode = address.zipcode
        },
        CheckLanuage() {

        },
        submitForm() {
            this.formHasErrors = false
      console.log('form',this.form);
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })


      console.log('formHasErrors',this.formHasErrors);



        },
        back(){
            this.z = 'registerConsent';
        },
        checkDigitId(pid){
           const value = functions.checkPID(pid)
           console.log('value', value);
        }

        

    },

}
</script>
