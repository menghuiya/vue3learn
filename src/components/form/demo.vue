<template>
  <div class="demo-box">
    <m-form :model="formData" :rules="formRule" ref="MForm" @validate="handleValidate">
      <m-form-item label="姓名:" prop="name">
        <m-input placeholder="请输入姓名" v-model="formData.name"></m-input>
      </m-form-item>
      <!-- <m-form-item label="账户:">
        <m-input placeholder="请输入账户" v-model="formData.account"></m-input>
      </m-form-item> -->
      <m-form-item label="密码:" prop="password">
        <m-input placeholder="请输入密码" type="password" v-model="formData.password"></m-input>
      </m-form-item>
      <button type="button" @click="submit">提交</button>
    </m-form>
  </div>
</template>
<script lang="tsx">
import { ErrorList } from 'async-validator';
import { defineComponent, reactive, ref } from 'vue';
import { FormContext } from './types';

export default defineComponent({
  name: 'FormDemo',
  setup(props, { emit }) {
    const text = ref('');
    const formData = reactive({
      name: '',
      password: '',
    });
    const formRule = reactive({
      name: [
        {
          required: true,
          message: '请请输入名字',
          trigger: 'blur',
        },
        {
          max: 6,
          message: '不能超过6位数',
          trigger: 'blur',
        },
      ],
      password: [
        {
          min: 6,
          message: '不能小于6位数',
          trigger: 'blur',
        },
        {
          required: true,
          message: '请请输入密码',
          trigger: 'blur',
        },
      ],
    });
    const MForm = ref<FormContext | null>(null);
    const submit = () => {
      MForm.value!.validate((valid: boolean | ErrorList) => {
        console.log('valid', valid);
      });
    };
    const handleValidate = (valid: boolean | ErrorList) => {
      console.log('handleValidate', valid);
    };
    return { text, formData, formRule, submit, MForm, handleValidate };
  },
});
</script>

<style lang="scss"></style>
