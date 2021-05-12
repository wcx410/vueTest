<template>
  <div style="width: 1000px;margin: auto; padding-left: 10px;border: solid gray 1px;height: 990px;">
    <el-page-header content="wl" @click="fanhui"></el-page-header>
    <div class="chat-content">
      <!-- recordContent 聊天记录数组  v-for="(itemc,indexc) in msg" :key="indexc"-->
        <MessageMid :data ="msg"></MessageMid>
      <!--发送消息部分-->
      <Messagebom :str="str2"></Messagebom>
    </div>
  </div>
</template>

<script>
  import MessageMid from "../message/MessageMid"
  import Messagebom from "../message/Messagebom"
    export default {
        name: "Message",
        data(){
            return{
                msg:[
                  {
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },
                  {
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },
                  {
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },
                  {
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },
                  {
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },
                  {
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },
                  {
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },
                  {
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },{
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },{
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },{
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },{
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },{
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },{
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },{
                    name1:"wl",
                    name2:'liang',
                    content2:"hi",
                    content1:"hello",
                  },







                ],
              str2:"",
            }
        },
        methods:{
          add_data(){

          },
          load () {
            this.count += 2
          },
          fanhui(){
            this.$router.push('/msghome');
          }
        },
      components:{
        MessageMid,Messagebom
      },
      props:["data","str"],
        created() {
        }
    }
</script>

<style>
  .chat-content {
    width: 100%;
    padding: 20px;
  }
  .word {
    display: flex;
    margin-bottom: 20px;
  }
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .info {
    margin-left: 10px;
  }
  .time{
    font-size: 12px;
    color: rgba(51,51,51,0.8);
    margin: 0;
    height: 20px;
    line-height: 20px;
    margin-top: -5px;
  }
  .info-content{
    padding: 10px;
    font-size: 14px;
    background: #fff;
    position: relative;
    margin-top: 8px;
  }
  /*//小三角形*/
    .info-content::before{
      position: absolute;
      left: -8px;
      top: 8px;
      content: '';
      border-right: 10px solid #FFF;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }

  .word-my {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .info2 {
    width: 90%;
    margin-left: 10px;
    text-align: right;
  }
  .time2{
    font-size: 12px;
    color: rgba(51,51,51,0.8);
    margin: 0;
    height: 20px;
    line-height: 20px;
    margin-top: -5px;
    margin-right: 20px;
  }
  .info-content2{
    max-width: 70%;
    padding: 10px;
    font-size: 14px;
    float: right;
    margin-right: 25px;
    position: relative;
    margin-top: 8px;
    background: #A3C3F6;
    text-align: left;
  }
  /*//小三角形*/
    .info-content::after{
      position: absolute;
      right: -8px;
      top: 8px;
      content: '';
      border-left: 10px solid #A3C3F6;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }

  .talk_con1{
    width:600px;
    height:500px;
    border:1px solid #666;
    margin: 30px;
    float: left;
    background:#e98080;
  }

  .talk_con2{
    width:600px;
    height:500px;
    border:1px solid #666;
    margin: 30px;
    float: right;
    background:#7adbd3;
  }
  .talk_show{
    width:580px;
    height:420px;
    border:1px solid #666;
    background:#fff;
    margin:10px auto 0;
    overflow:auto;
  }
  .talk_input{
    width:580px;
    margin:10px auto 0;
  }
  .whotalk{
    width:80px;
    height:30px;
    float:left;
    outline:none;
  }
  .talk_word{
    width:420px;
    height:26px;
    padding:0px;
    float:left;
    margin-left:10px;
    outline:none;
    text-indent:10px;
  }
  .talk_sub{
    width:56px;
    height:30px;
    float:left;
    margin-left:10px;
  }
  .atalk{
    margin:10px;
  }
  .atalk span{
    display:inline-block;
    background:#0181cc;
    border-radius:10px;
    color:#fff;
    padding:5px 10px;
  }
  .btalk{
    margin:10px;
    text-align:right;
  }
  .btalk span{
    display:inline-block;
    background:#ef8201;
    border-radius:10px;
    color:#fff;
    padding:5px 10px;
  }
</style>
