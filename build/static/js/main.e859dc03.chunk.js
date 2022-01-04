(this["webpackJsonpoctopus-explorer"]=this["webpackJsonpoctopus-explorer"]||[]).push([[0],{185:function(e,t){},225:function(e,t){},230:function(e,t){},248:function(e,t){},270:function(e,t,c){},272:function(e,t){},275:function(e,t){},285:function(e,t,c){"use strict";c.r(t);var s=c(3),n=c.n(s),i=c(175),a=c.n(i),j=c(79),l=c(176),r=c.n(l),o=c(19),d=c.n(o),b=(c(270),c(13)),x=c(15),h=c(361),O=c(339),u=c(366),m=c(357),f=c(359),p=c(354),g=c(360),y=c(355);const v=c(271);function S(e,t){return new v(e).div(new v(10**t)).toNumber().toFixed(2)}let k,w;function C(e){const{appchain_metadata:{fungible_token_metadata:{decimals:t}}}=w;return S(e,t)}async function I(e){if(k){const{appchain_metadata:{fungible_token_metadata:{decimals:t}}}=w;return S((await k.query.system.account(e)).data.free.toString(),t)}}var z=c(327),T=c(328),$=c(325),E=c(196),_=c(329),B=c(367),M=c(330),P=c(368),R=c(356),A=c(335),D=c(332),q=c(336),N=c.p+"static/media/octopus_logo_white.dc543f3b.png",H=c(1);const F=({title:e,to:t})=>{const c="/"+Object(x.h)().pathname.split("/")[1]==t;return Object(H.jsx)($.a,{as:b.b,to:t,children:Object(H.jsx)(E.a,{background:"transparent",color:c?"white":"whiteAlpha.700",_hover:{background:"transparent"},_active:{background:"transparent",color:"white"},children:e})})};var L=()=>Object(H.jsx)("div",{style:{background:"#26262f"},children:Object(H.jsx)(z.a,{maxW:"container.xl",h:"88px",children:Object(H.jsxs)(T.a,{align:"center",justify:"center",h:"100%",children:[Object(H.jsx)(_.a,{p:"2",pl:"0",children:Object(H.jsx)(B.a,{src:N,htmlWidth:140,alt:"logo"})}),Object(H.jsx)(M.a,{}),Object(H.jsxs)(P.a,{spacing:"5px",display:{xs:"none",sm:"none",md:"none",lg:"block"},children:[Object(H.jsx)(F,{title:"Home",to:"/home"}),Object(H.jsx)(F,{title:"Blocks",to:"/blocks"}),Object(H.jsx)(F,{title:"Accounts",to:"/accounts"}),Object(H.jsx)(F,{title:"Transfers",to:"/transfers"}),Object(H.jsx)(F,{title:"Extrinsics",to:"/extrinsics"}),Object(H.jsx)($.a,{href:"https://testnet.oct.network",target:"_blank",children:Object(H.jsx)(E.a,{background:"transparent",color:"whiteAlpha.700",_hover:{background:"transparent"},rightIcon:Object(H.jsx)(D.a,{}),_active:{background:"transparent",color:"white"},children:"Testnet"})})]}),Object(H.jsx)(_.a,{display:{md:"block",lg:"none"},children:Object(H.jsxs)(R.a,{children:[Object(H.jsx)(R.b,{colorScheme:"white",as:A.a,icon:Object(H.jsx)(q.a,{fontSize:"2xl"})}),Object(H.jsxs)(R.d,{children:[Object(H.jsx)(R.c,{children:Object(H.jsx)($.a,{as:b.b,to:"/home",children:"Home"})}),Object(H.jsx)(R.c,{children:Object(H.jsx)($.a,{as:b.b,to:"/home",children:"Blocks"})}),Object(H.jsx)(R.c,{children:Object(H.jsx)($.a,{as:b.b,to:"/home",children:"Extrinsics"})})]})]})})]})})}),W=c(337),U=c(96),G=c(143);var Y=()=>Object(H.jsx)("div",{style:{background:"#26262f"},children:Object(H.jsx)(z.a,{maxW:"container.xl",p:2,children:Object(H.jsxs)(T.a,{align:"center",justifyContent:"space-between",children:[Object(H.jsx)(_.a,{p:4,children:Object(H.jsx)(W.a,{color:"whiteAlpha.600",fontSize:"sm",children:"Copyright @ 2021 Octopus Network"})}),Object(H.jsxs)(P.a,{children:[Object(H.jsx)($.a,{href:"https://github.com/octopus-network",target:"_blank",children:Object(H.jsx)(A.a,{variant:"link","aria-label":"github",_hover:{color:"whiteAlpha.800"},icon:Object(H.jsx)(U.a,{as:G.a,boxSize:6})})}),Object(H.jsx)($.a,{href:"mailto:hi@oct.network",children:Object(H.jsx)(A.a,{variant:"link","aria-label":"github",_hover:{color:"whiteAlpha.800"},icon:Object(H.jsx)(U.a,{as:G.b,boxSize:6})})})]})]})})}),K=c(363),Q=c.p+"static/media/background.f2028ec3.svg",V=c(338),J=c(358),X=c(323),Z=c(199),ee=c(55),te=c(178);async function ce(e,t){if(/^[0-9]+$/.test(e)){if(await async function(e,t){const c=await t.query({query:J.a`
      query blockdetail($number: BigFloat!) {
        blocks(filter: { number: { equalTo: $number } }) {
          nodes {
            id
          }
        }
      }
    `,variables:{number:e}});return c.data.blocks.nodes[0]?c.data.blocks.nodes[0].id:c.data.blocks.nodes[0]}(e,t))return"blockNumber"}else if(function(e){try{return Object(X.a)(Object(ee.c)(e)?Object(te.a)(e):Object(Z.a)(e)),!0}catch(t){return!1}}(e)){console.log("here");const c=await async function(e,t){const c=await t.query({query:J.a`
      query account($id: String!) {
        account(id: $id) {
          id
        }
      }
    `,variables:{id:e}});return c.data.account?c.data.account.id:c.data.account}(e,t);if(c)return console.log("accountResult",c),"accountId"}else if(/^0x[0-9a-f]+$/.test(e)){if(await async function(e,t){const c=await t.query({query:J.a`
      query txdetail($id: String!) {
        extrinsic(id: $id) {
          id
        }
      }
    `,variables:{id:e}});return c.data.extrinsic?c.data.extrinsic.id:c.data.extrinsic}(e,t))return"transaction";if(await async function(e,t){const c=await t.query({query:J.a`
      query blockdetail($id: String!) {
        block(id: $id) {
          id
        }
      }
    `,variables:{id:e}});return c.data.block?c.data.block.id:c.data.block}(e,t))return"blockHash"}return""}async function se(e,t){const c=await ce(e,t);let s="";return"blockNumber"==c||"blockHash"==c?s=`/blocks/${e}`:"transaction"==c?s=`/extrinsics/${e}`:"accountId"==c&&(s=`/accounts/${e}`),console.log("link",s),s}var ne=()=>{const e=Object(x.i)(),t=Object(V.a)(),c=Object(s.useRef)(),[n,i]=Object(s.useState)(""),[a,j]=Object(s.useState)(!1);return Object(H.jsxs)("div",{style:{background:`#26262f url(${Q})`,backgroundSize:"1600px auto",backgroundPosition:"center -110px",backgroundRepeat:"no-repeat"},children:[Object(H.jsx)(O.a,{h:"120px",pt:"20px",children:Object(H.jsx)(W.a,{color:"white",fontSize:"5xl",children:"Where Web3.0 Happens"})}),Object(H.jsx)(O.a,{h:"180px",pb:"100px",children:Object(H.jsxs)(T.a,{w:"100%",maxW:"420px",ref:c,transition:"max-width .3s ease",children:[Object(H.jsx)(K.a,{color:"grey",background:"white",onFocus:()=>{c.current&&(c.current.style.maxWidth="480px")},onBlur:()=>{c.current&&(c.current.style.maxWidth="420px")},onChange:e=>i(e.target.value),size:"lg",flex:"1",placeholder:"Search by block, transaction id",borderRightRadius:"0"}),Object(H.jsx)(E.a,{colorScheme:"teal",size:"lg",borderLeftRadius:"0",onClick:async()=>{j(!0);let c=await se(n,t);await new Promise((e=>setTimeout((()=>e(0)),500))),e(c),j(!1)},isLoading:a,disabled:a,children:"Search"})]})})]})};var ie=()=>{const e="/home"==Object(x.h)().pathname;return Object(H.jsxs)("div",{children:[Object(H.jsx)(L,{}),e&&Object(H.jsx)(ne,{}),Object(H.jsx)(z.a,{maxW:"container.xl",p:5,minH:e?"calc(100vh - 457px)":"calc(100vh - 157px)",children:Object(H.jsx)(x.b,{})}),Object(H.jsx)(Y,{})]})},ae=c(340),je=c(343),le=c(344),re=c(69),oe=c(362),de=c(342),be=c(341);const xe=J.a`
  query QueryNewExtrinsics {
    extrinsics(first: 5, orderBy: TIMESTAMP_DESC) {
      nodes {
        block {
          number
        }
        id
        method
        section
        timestamp
        blockId
      }
    }
  }
`;var he=()=>{var e;const{loading:t,data:c,stopPolling:n,startPolling:i}=Object(oe.a)(xe);return Object(s.useEffect)((()=>(i(1e3),()=>n())),[n,i]),Object(H.jsx)(_.a,{p:4,background:"white",borderRadius:"lg",boxShadow:"sm",children:t?Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})}):null===c||void 0===c||null===(e=c.extrinsics)||void 0===e?void 0:e.nodes.map((({section:e,id:t,method:c,timestamp:s,blockId:n},i)=>Object(H.jsxs)(T.a,{alignItems:"center",borderBottom:"1px solid #eee",justify:"space-between",pt:4,pb:4,children:[Object(H.jsxs)(_.a,{children:[Object(H.jsx)($.a,{color:"blue.600",as:b.b,to:`/extrinsics/${t}`,children:Object(H.jsxs)(ae.a,{as:"h6",size:"sm",children:[t.substr(0,32),"..."]})}),Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:3,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"sm",children:d()(s).add(8,"hours").toNow(!0)})]})]}),Object(H.jsx)(_.a,{display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsxs)(de.a,{size:"sm",colorScheme:"cyan",children:[e,".",c]})})]},`block-${t}`)))})};const Oe=J.a`
  query QueryNewBlocks {
    blocks(first: 5, orderBy: NUMBER_DESC) {
      nodes {
        id
        number
        timestamp
        extrinsics {
          totalCount
        }
        events {
          totalCount
        }
      }
    }
  }
`;var ue=()=>{var e;const{loading:t,data:c,stopPolling:n,startPolling:i}=Object(oe.a)(Oe);return Object(s.useEffect)((()=>(i(1e3),()=>n())),[n,i]),Object(H.jsx)(_.a,{p:4,background:"white",borderRadius:"lg",boxShadow:"sm",children:t?Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})}):null===c||void 0===c||null===(e=c.blocks)||void 0===e?void 0:e.nodes.map((({number:e,id:t,timestamp:c,extrinsics:s,events:n},i)=>Object(H.jsxs)(T.a,{alignItems:"center",borderBottom:"1px solid #eee",justify:"space-between",pt:4,pb:4,children:[Object(H.jsxs)(_.a,{children:[Object(H.jsx)($.a,{color:"blue.600",as:b.b,to:`/blocks/${e}`,children:Object(H.jsxs)(ae.a,{as:"h6",size:"sm",children:["#",e]})}),Object(H.jsxs)(P.a,{spacing:5,mt:1,children:[Object(H.jsxs)(W.a,{fontSize:"sm",color:"grey",children:[s.totalCount," extrinsics"]}),Object(H.jsxs)(W.a,{fontSize:"sm",color:"grey",children:[n.totalCount," events"]})]})]}),Object(H.jsxs)(_.a,{display:"flex",alignItems:"center",justifyContent:"center",children:[Object(H.jsx)(be.a,{mr:3,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"sm",children:d()(c).add(8,"hours").toNow(!0)})]})]},`block-${t}`)))})};const me=J.a`
  query QueryGlobalData {
    blocks {
      totalCount
    }
    extrinsics {
      totalCount
    }
    accounts {
      totalCount
    }
    systemTokenTransfers {
      totalCount
    }
  }
`,fe=({label:e,value:t,icon:c})=>Object(H.jsxs)(T.a,{align:"center",height:"100%",children:[Object(H.jsx)(_.a,{children:Object(H.jsx)(U.a,{as:c,boxSize:6,color:"teal"})}),Object(H.jsxs)(T.a,{ml:4,align:"center",justify:"space-between",flex:1,children:[Object(H.jsx)(W.a,{fontSize:"sm",textColor:"grey",children:e}),Object(H.jsx)(ae.a,{as:"h6",size:"sm",children:t})]})]});var pe=()=>{const{loading:e,data:t,startPolling:c,stopPolling:n}=Object(oe.a)(me);return Object(s.useEffect)((()=>(c(1e3),()=>n())),[c,n]),Object(H.jsxs)("div",{children:[Object(H.jsx)(_.a,{borderRadius:"lg",p:3,background:"white",mt:"-60px",boxShadow:"sm",children:Object(H.jsxs)(je.a,{templateColumns:"repeat(49, 1fr)",children:[Object(H.jsx)(je.b,{colSpan:24,children:Object(H.jsxs)(je.a,{templateRows:"repeat(13, 1fr)",h:"120px",children:[Object(H.jsx)(je.b,{rowSpan:6,children:Object(H.jsx)(fe,{label:"Blocks",icon:re.b,value:null===t||void 0===t?void 0:t.blocks.totalCount})}),Object(H.jsx)(je.b,{rowSpan:1,display:"flex",alignItems:"center",children:Object(H.jsx)(le.a,{orientation:"horizontal"})}),Object(H.jsx)(je.b,{rowSpan:6,children:Object(H.jsx)(fe,{label:"Accounts",icon:re.a,value:null===t||void 0===t?void 0:t.accounts.totalCount})})]})}),Object(H.jsx)(je.b,{colSpan:1,display:"flex",justifyContent:"center",children:Object(H.jsx)(le.a,{orientation:"vertical"})}),Object(H.jsx)(je.b,{colSpan:24,children:Object(H.jsxs)(je.a,{templateRows:"repeat(13, 1fr)",h:"120px",children:[Object(H.jsx)(je.b,{rowSpan:6,children:Object(H.jsx)(fe,{label:"Extrinsics",icon:re.d,value:null===t||void 0===t?void 0:t.extrinsics.totalCount})}),Object(H.jsx)(je.b,{rowSpan:1,display:"flex",alignItems:"center",children:Object(H.jsx)(le.a,{orientation:"horizontal"})}),Object(H.jsx)(je.b,{rowSpan:6,children:Object(H.jsx)(fe,{label:"Transfers",icon:re.c,value:null===t||void 0===t?void 0:t.systemTokenTransfers.totalCount})})]})})]})}),Object(H.jsxs)(je.a,{gap:6,templateColumns:"repeat(6, 1fr)",mt:4,children:[Object(H.jsxs)(je.b,{colSpan:3,children:[Object(H.jsxs)(T.a,{align:"center",justify:"space-between",pt:3,pb:4,children:[Object(H.jsxs)(P.a,{children:[Object(H.jsx)(re.b,{}),Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Latest Blocks"})]}),Object(H.jsx)($.a,{as:b.b,to:"/blocks",children:Object(H.jsx)(E.a,{colorScheme:"teal",size:"sm",children:"All"})})]}),Object(H.jsx)(ue,{})]}),Object(H.jsxs)(je.b,{colSpan:3,children:[Object(H.jsxs)(T.a,{align:"center",justify:"space-between",pt:3,pb:4,children:[Object(H.jsxs)(P.a,{children:[Object(H.jsx)(re.d,{}),Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Latest Extrinsics"})]}),Object(H.jsx)($.a,{as:b.b,to:"/extrinsics",children:Object(H.jsx)(E.a,{colorScheme:"teal",size:"sm",children:"All"})})]}),Object(H.jsx)(he,{})]})]})]})},ge=c(345),ye=c(346),ve=c(347);var Se=()=>{const e=Object(x.i)(),t=Object(V.a)(),[c,n]=Object(s.useState)(""),[i,a]=Object(s.useState)(!1);return Object(H.jsxs)(T.a,{children:[Object(H.jsx)(K.a,{color:"grey",background:"white",onChange:e=>n(e.target.value),size:"lg",flex:"1",placeholder:"Search for block/extrinsic/account",borderRightRadius:"0"}),Object(H.jsx)(E.a,{colorScheme:"teal",size:"lg",borderLeftRadius:"0",onClick:async()=>{a(!0);let s=await se(c,t);await new Promise((e=>setTimeout((()=>e(0)),500))),e(s),a(!1)},isLoading:i,disabled:i,children:"Search"})]})};const ke=J.a`
  query QueryBlocks($offset: Int!, $pageSize: Int!) {
    blocks(offset: $offset, first: $pageSize, orderBy: NUMBER_DESC) {
      nodes {
        id
        number
        timestamp
        extrinsics {
          totalCount
        }
        events {
          totalCount
        }
      }
      totalCount
    }
  }
`;var we=()=>{const[e,t]=Object(s.useState)(0),[c,n]=Object(s.useState)(!1),{loading:i,data:a,stopPolling:j,startPolling:l}=Object(oe.a)(ke,{variables:{offset:20*e,pageSize:20}});return Object(s.useEffect)((()=>(l(1e3),()=>j())),[l,j]),console.log(a),Object(H.jsxs)("div",{children:[Object(H.jsx)(Se,{}),Object(H.jsx)(_.a,{p:5,background:"white",mt:5,boxShadow:"sm",borderRadius:"lg",children:i?Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})}):Object(H.jsxs)(ge.a,{variant:"simple",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:[Object(H.jsx)(ge.e,{children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{children:"Block"}),Object(H.jsx)(ge.d,{children:"Timestamp"}),Object(H.jsx)(ge.d,{children:"Extrinsics"}),Object(H.jsx)(ge.d,{children:"Events"}),Object(H.jsx)(ge.d,{children:"Hash"})]})}),Object(H.jsx)(ge.b,{children:null===a||void 0===a?void 0:a.blocks.nodes.map((({number:e,id:t,timestamp:c,events:s,extrinsics:n})=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)($.a,{as:b.b,to:`/blocks/${e}`,color:"blue.600",children:Object(H.jsxs)(ae.a,{size:"sm",as:"h6",children:["#",e]})})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:4,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"md",children:d()(c).add(8,"hours").toNow(!0)})]})}),Object(H.jsx)(ge.c,{children:n.totalCount}),Object(H.jsx)(ge.c,{children:s.totalCount}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/blocks/${t}`,color:"blue.600",children:[t.substr(32),"..."]})})]},`block-${t}`)))})]})}),Object(H.jsxs)(T.a,{align:"center",justify:"space-between",mt:4,children:[Object(H.jsx)("div",{style:{flexGrow:1}}),Object(H.jsxs)(P.a,{children:[Object(H.jsx)(A.a,{"aria-label":"left",icon:Object(H.jsx)(ye.a,{}),disabled:e<=0,onClick:()=>t(e-1)}),Object(H.jsxs)(_.a,{children:[e+1," of"," ",a?Math.ceil((null===a||void 0===a?void 0:a.blocks.totalCount)/20):1]}),Object(H.jsx)(A.a,{disabled:e>=Math.ceil((null===a||void 0===a?void 0:a.blocks.totalCount)/20),"aria-label":"left",icon:Object(H.jsx)(ve.a,{}),onClick:()=>t(e+1)})]})]})]})},Ce=c(364),Ie=c(369),ze=c(349),Te=c(348),$e=c(350);var Ee=({value:e})=>{const{hasCopied:t,onCopy:c}=Object(Te.a)(e);return Object(H.jsx)(A.a,{background:"transparent","aria-label":"copy",onClick:c,ml:1,icon:Object(H.jsx)(U.a,{as:t?ze.a:$e.a,boxSize:4})})};const _e=J.a`
  query BlockDetail($number: BigFloat!) {
    blocks(filter: { number: { equalTo: $number } }) {
      nodes {
        id
        number
        parentHash
        specVersion
        timestamp
        extrinsics {
          nodes {
            section
            method
            id
            args
            timestamp
          }
        }
        events {
          nodes {
            method
            data
          }
        }
      }
    }
  }
`,Be=J.a`
  query BlockDetail($id: String!) {
    block(id: $id) {
      id
      number
      parentHash
      specVersion
      timestamp
      extrinsics {
        nodes {
          section
          id
          method
          args
          timestamp
        }
      }
      events {
        nodes {
          section
          method
          data
        }
      }
    }
  }
`;var Me=()=>{var e;const{id:t}=Object(x.j)(),[c,n]=Object(s.useState)(),[i,a]=Object(s.useState)(""),[j,l]=Object(s.useState)(!1),[r,o]=Object(s.useState)(0),[h,O]=Object(s.useState)(!1),m=Object(x.i)(),{loading:f,data:p,startPolling:g,stopPolling:y}=Object(oe.a)(h?_e:Be,{variables:h?{number:t}:{id:t}});Object(s.useEffect)((()=>(g(1e3),()=>y())),[]),Object(s.useEffect)((()=>{!/0x/.test(t)&&/^\d+$/.test(t)?(a(t),O(!0)):(O(!1),a(""))}),[t]),Object(s.useEffect)((()=>{p?h?n(p.blocks.nodes[0]):p.block&&(n(p.block),a(p.block.number)):n(null)}),[p,h]),Object(s.useEffect)((()=>{if(c){let e=d()(c.timestamp).add(8,"hours").diff(d()(),"seconds");o(e),l(e<-12)}}),[c]);return Object(H.jsxs)("div",{children:[Object(H.jsxs)(T.a,{justify:"space-between",align:"center",children:[Object(H.jsxs)(P.a,{spacing:4,children:[Object(H.jsx)(A.a,{"aria-label":"prev",onClick:()=>{m("/blocks/"+(parseInt(i)-1))},borderRadius:"md",icon:Object(H.jsx)(U.a,{as:ye.a,boxSize:6}),disabled:f||!i||parseInt(i)<=1}),Object(H.jsxs)(ae.a,{as:"h6",size:"sm",children:["Block #",i]}),Object(H.jsx)(A.a,{"aria-label":"next",onClick:()=>{m(`/blocks/${parseInt(i)+1}`)},borderRadius:"md",icon:Object(H.jsx)(U.a,{as:ve.a,boxSize:6}),disabled:!i||f})]}),Object(H.jsx)(Se,{})]}),Object(H.jsx)(_.a,{mt:5,p:4,background:"white",boxShadow:"sm",borderRadius:"lg",children:c?Object(H.jsx)(ge.a,{variant:"simple",children:Object(H.jsxs)(ge.b,{children:[Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Timestamp"})}),Object(H.jsx)(ge.c,{children:d()(null===c||void 0===c?void 0:c.timestamp).add(8,"hours").format("YYYY-MM-DD HH:mm:ss")})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Status"})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,children:[Object(H.jsx)(Ce.a,{color:"green.400",size:"28px",value:Math.abs(100*r/12),children:j&&Object(H.jsx)(Ce.b,{children:Object(H.jsx)(U.a,{as:ze.a,boxSize:3,color:"green.400"})})}),Object(H.jsx)(W.a,{children:j?"Confirmed":"Pending"})]})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Hash"})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(T.a,{align:"center",children:[Object(H.jsx)(W.a,{children:c.id}),Object(H.jsx)(Ee,{value:c.id})]})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Parent hash"})}),Object(H.jsx)(ge.c,{children:Object(H.jsx)($.a,{as:b.b,to:`/blocks/${c.parentHash}`,color:"blue.600",children:c.parentHash})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Spec version"})}),Object(H.jsx)(ge.c,{children:c.specVersion})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Block time"})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:3,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"sm",children:d()(c.timestamp).add(8,"hours").toNow(!0)})]})})]})]})}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})})}),Object(H.jsx)(_.a,{mt:5,p:4,background:"white",boxShadow:"sm",borderRadius:"lg",children:Object(H.jsxs)(Ie.e,{children:[Object(H.jsxs)(Ie.b,{children:[Object(H.jsx)(Ie.a,{children:"Extrinsics"}),Object(H.jsxs)(Ie.a,{children:["Logs(",(null===p||void 0===p||null===(e=p.events)||void 0===e?void 0:e.totalCount)||0,")"]})]}),Object(H.jsxs)(Ie.d,{children:[Object(H.jsx)(Ie.c,{children:c?Object(H.jsxs)(ge.a,{children:[Object(H.jsx)(ge.e,{background:"teal.50",children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{}),Object(H.jsx)(ge.d,{children:"Hash"}),Object(H.jsx)(ge.d,{children:"Method"}),Object(H.jsx)(ge.d,{children:"Time"})]})}),Object(H.jsx)(ge.b,{children:c.extrinsics.nodes.map((({id:e,timestamp:t,section:c,method:s},n)=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:n}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/extrinsics/${e}`,color:"blue.600",children:[e.substr(0,32),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(de.a,{size:"sm",colorScheme:"cyan",children:[c,".",s]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:3,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"sm",children:d()(t).add(8,"hours").toNow(!0)})]})})]},`extrinsic-${e}`)))})]}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})})}),Object(H.jsx)(Ie.c,{children:c?Object(H.jsxs)(ge.a,{children:[Object(H.jsx)(ge.e,{background:"teal.50",children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{}),Object(H.jsx)(ge.d,{children:"Method"}),Object(H.jsx)(ge.d,{children:"Data"})]})}),Object(H.jsx)(ge.b,{children:c.events.nodes.map((({section:e,method:c,data:s},n)=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:n}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(de.a,{size:"sm",colorScheme:"cyan",children:[e,".",c]})}),Object(H.jsx)(ge.c,{children:s})]},`extrinsic-${t}`)))})]}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})})})]})]})})]})};const Pe=J.a`
  query QueryAccounts($offset: Int!, $pageSize: Int!) {
    accounts(offset: $offset, first: $pageSize, orderBy: ID_ASC) {
      nodes {
        id
        calls {
          totalCount
        }
        systemTokenTransfersByFromId {
          totalCount
        }
        systemTokenTransfersByToId {
          totalCount
        }
      }
      totalCount
    }
  }
`;var Re=()=>{const[e,t]=Object(s.useState)(0),[c,n]=Object(s.useState)([]),[i,a]=Object(s.useState)(!1),{loading:j,data:l,stopPolling:r,startPolling:o}=Object(oe.a)(Pe,{variables:{offset:20*e,pageSize:20}});return Object(s.useEffect)((()=>(o(15e3),()=>r())),[o,r]),Object(s.useEffect)((()=>{(async()=>{if(l){const e=await Promise.all(l.accounts.nodes.map((async e=>{const t=await I(e.id);return{...e,balance:t}})));n(e)}})()}),[l]),Object(H.jsxs)("div",{children:[Object(H.jsx)(Se,{}),Object(H.jsx)(_.a,{p:5,background:"white",mt:5,boxShadow:"sm",borderRadius:"lg",children:j?Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})}):Object(H.jsxs)(ge.a,{variant:"simple",onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:[Object(H.jsx)(ge.e,{children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{children:"ID"}),Object(H.jsx)(ge.d,{children:"Balance"}),Object(H.jsx)(ge.d,{children:"Transfers"}),Object(H.jsx)(ge.d,{children:"Calls"})]})}),Object(H.jsx)(ge.b,{children:c.map((({id:e,balance:t,calls:c,systemTokenTransfersByFromId:s,systemTokenTransfersByToId:n})=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsxs)(T.a,{align:"center",children:[Object(H.jsx)($.a,{as:b.b,to:`/accounts/${e}`,color:"blue.600",children:Object(H.jsxs)(ae.a,{size:"sm",as:"h6",children:[e.slice(0,18),"..."]})}),Object(H.jsx)(Ee,{value:e})]})}),Object(H.jsx)(ge.c,{children:t}),Object(H.jsx)(ge.c,{children:s.totalCount+n.totalCount}),Object(H.jsx)(ge.c,{children:c.totalCount})]},`account-${e}`)))})]})}),Object(H.jsxs)(T.a,{align:"center",justify:"space-between",mt:4,children:[Object(H.jsx)("div",{style:{flexGrow:1}}),Object(H.jsxs)(P.a,{children:[Object(H.jsx)(A.a,{"aria-label":"left",icon:Object(H.jsx)(ye.a,{}),disabled:e<=0,onClick:()=>t(e-1)}),Object(H.jsxs)(_.a,{children:[e+1," of"," ",l?Math.ceil((null===l||void 0===l?void 0:l.accounts.totalCount)/20):1]}),Object(H.jsx)(A.a,{disabled:e>=Math.ceil((null===l||void 0===l?void 0:l.accounts.totalCount)/20),"aria-label":"left",icon:Object(H.jsx)(ve.a,{}),onClick:()=>t(e+1)})]})]})]})};const Ae=J.a`
  query AccountCalls($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      calls(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          section
          method
          args
          timestamp
          isSuccess
          signerId
          extrinsicId
          parentCallId
        }
        totalCount
      }
    }
  }
`,De=J.a`
  query AccountTransfersOut($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      systemTokenTransfersByFromId(
        offset: $offset
        first: $pageSize
        orderBy: TIMESTAMP_DESC
      ) {
        nodes {
          id
          fromId
          toId
          amount
          extrinsicId
          timestamp
        }
        totalCount
      }
    }
  }
`,qe=J.a`
  query AccountTransfersIn($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      systemTokenTransfersByToId(
        offset: $offset
        first: $pageSize
        orderBy: TIMESTAMP_DESC
      ) {
        nodes {
          id
          fromId
          toId
          amount
          extrinsicId
          timestamp
        }
        totalCount
      }
    }
  }
`,Ne=20;var He=()=>{var e,t,c;const{id:n}=Object(x.j)(),[i,a]=Object(s.useState)(),[j,l]=Object(s.useState)(0),[r,o]=Object(s.useState)(0),[h,O]=Object(s.useState)(0),m=Object(oe.a)(Ae,{variables:{id:n,offset:j*Ne,pageSize:Ne}}),f=Object(oe.a)(De,{variables:{id:n,offset:j*Ne,pageSize:Ne}}),p=Object(oe.a)(qe,{variables:{id:n,offset:j*Ne,pageSize:Ne}});return Object(s.useEffect)((()=>(m.startPolling(3e4),f.startPolling(3e4),p.startPolling(3e4),()=>{m.stopPolling(),f.stopPolling(),p.stopPolling()})),[]),Object(s.useEffect)((()=>{(async()=>{if(m.data&&f.data&&p.data){const e=await I(n),t={...m.data.account,...f.data.account,...p.data.account,balance:e};console.log("account:",t),a(t)}else a(null)})()}),[m,f,p]),Object(H.jsxs)("div",{children:[Object(H.jsxs)(T.a,{justify:"space-between",align:"center",children:[Object(H.jsx)(ae.a,{as:"h6",size:"sm",children:"Account Detail"}),Object(H.jsx)(Se,{})]}),Object(H.jsx)(_.a,{mt:5,p:4,background:"white",boxShadow:"sm",borderRadius:"lg",children:i?Object(H.jsx)(ge.a,{variant:"simple",children:Object(H.jsxs)(ge.b,{children:[Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"ID"})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(T.a,{align:"center",children:[Object(H.jsx)(W.a,{children:n}),Object(H.jsx)(Ee,{value:n})]})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Balance"})}),Object(H.jsx)(ge.c,{children:i.balance})]})]})}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})})}),Object(H.jsx)(_.a,{mt:5,p:4,background:"white",boxShadow:"sm",borderRadius:"lg",children:Object(H.jsxs)(Ie.e,{children:[Object(H.jsxs)(Ie.b,{children:[Object(H.jsxs)(Ie.a,{children:["Calls(",(null===i||void 0===i||null===(e=i.calls)||void 0===e?void 0:e.totalCount)||0,")"]}),Object(H.jsxs)(Ie.a,{children:["Transfers Out(",(null===i||void 0===i||null===(t=i.systemTokenTransfersByFromId)||void 0===t?void 0:t.totalCount)||0,")"]}),Object(H.jsxs)(Ie.a,{children:["Transfers In(",(null===i||void 0===i||null===(c=i.systemTokenTransfersByToId)||void 0===c?void 0:c.totalCount)||0,")"]})]}),Object(H.jsxs)(Ie.d,{children:[Object(H.jsxs)(Ie.c,{children:[i?Object(H.jsxs)(ge.a,{children:[Object(H.jsx)(ge.e,{background:"teal.50",children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{children:"ID"}),Object(H.jsx)(ge.d,{children:"Method"}),Object(H.jsx)(ge.d,{children:"Signer Id"}),Object(H.jsx)(ge.d,{children:"Extrinsic Id"}),Object(H.jsx)(ge.d,{children:"Time"})]})}),Object(H.jsx)(ge.b,{children:i.calls.nodes.map((({id:e,section:t,method:c,signerId:s,extrinsicId:n,timestamp:i},a)=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsxs)(T.a,{align:"center",children:[Object(H.jsxs)(W.a,{children:[e.slice(0,18),"..."]}),Object(H.jsx)(Ee,{value:e})]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(de.a,{size:"sm",colorScheme:"cyan",children:[t,".",c]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/accounts/${s}`,color:"blue.600",children:[s.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/extrinsics/${n}`,color:"blue.600",children:[n.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:3,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"sm",children:d()(i).add(8,"hours").toNow(!0)})]})})]},`account-${e}`)))})]}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})}),Object(H.jsxs)(T.a,{align:"center",justify:"space-between",mt:4,children:[Object(H.jsx)("div",{style:{flexGrow:1}}),Object(H.jsxs)(P.a,{children:[Object(H.jsx)(A.a,{"aria-label":"left",icon:Object(H.jsx)(ye.a,{}),disabled:j<=0,onClick:()=>l(j-1)}),Object(H.jsxs)(_.a,{children:[j+1," of"," ",i?Math.ceil((null===i||void 0===i?void 0:i.calls.totalCount)/Ne):1]}),Object(H.jsx)(A.a,{disabled:j>=Math.ceil((null===i||void 0===i?void 0:i.calls.totalCount)/Ne),"aria-label":"left",icon:Object(H.jsx)(ve.a,{}),onClick:()=>l(j+1)})]})]})]}),Object(H.jsxs)(Ie.c,{children:[i?Object(H.jsxs)(ge.a,{children:[Object(H.jsx)(ge.e,{background:"teal.50",children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{children:"ID"}),Object(H.jsx)(ge.d,{children:"From"}),Object(H.jsx)(ge.d,{children:"To"}),Object(H.jsx)(ge.d,{children:"Amount"}),Object(H.jsx)(ge.d,{children:"extrinsic"}),Object(H.jsx)(ge.d,{children:"Time"})]})}),Object(H.jsx)(ge.b,{children:i.systemTokenTransfersByFromId.nodes.map((({id:e,fromId:t,toId:c,amount:s,extrinsicId:n,timestamp:i},a)=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)($.a,{as:b.b,to:`/transfers/${e}`,color:"blue.600",children:e})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/accounts/${t}`,color:"blue.600",children:[t.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/accounts/${c}`,color:"blue.600",children:[c.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:C(s)}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/extrinsics/${n}`,color:"blue.600",children:[n.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:3,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"sm",children:d()(i).add(8,"hours").toNow(!0)})]})})]},`account-${e}`)))})]}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})}),Object(H.jsxs)(T.a,{align:"center",justify:"space-between",mt:4,children:[Object(H.jsx)("div",{style:{flexGrow:1}}),Object(H.jsxs)(P.a,{children:[Object(H.jsx)(A.a,{"aria-label":"left",icon:Object(H.jsx)(ye.a,{}),disabled:r<=0,onClick:()=>o(r-1)}),Object(H.jsxs)(_.a,{children:[r+1," of"," ",i?Math.ceil((null===i||void 0===i?void 0:i.systemTokenTransfersByFromId.totalCount)/Ne):1]}),Object(H.jsx)(A.a,{disabled:r>=Math.ceil((null===i||void 0===i?void 0:i.systemTokenTransfersByFromId.totalCount)/Ne),"aria-label":"left",icon:Object(H.jsx)(ve.a,{}),onClick:()=>o(r+1)})]})]})]}),Object(H.jsxs)(Ie.c,{children:[i?Object(H.jsxs)(ge.a,{children:[Object(H.jsx)(ge.e,{background:"teal.50",children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{children:"ID"}),Object(H.jsx)(ge.d,{children:"From"}),Object(H.jsx)(ge.d,{children:"To"}),Object(H.jsx)(ge.d,{children:"Amount"}),Object(H.jsx)(ge.d,{children:"extrinsic"}),Object(H.jsx)(ge.d,{children:"Time"})]})}),Object(H.jsx)(ge.b,{children:i.systemTokenTransfersByToId.nodes.map((({id:e,fromId:t,toId:c,amount:s,extrinsicId:n,timestamp:i},a)=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)($.a,{as:b.b,to:`/transfers/${e}`,color:"blue.600",children:e})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/accounts/${t}`,color:"blue.600",children:[t.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/accounts/${c}`,color:"blue.600",children:[c.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:C(s)}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/extrinsics/${n}`,color:"blue.600",children:[n.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:3,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"sm",children:d()(i).add(8,"hours").toNow(!0)})]})})]},`account-${e}`)))})]}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})}),Object(H.jsxs)(T.a,{align:"center",justify:"space-between",mt:4,children:[Object(H.jsx)("div",{style:{flexGrow:1}}),Object(H.jsxs)(P.a,{children:[Object(H.jsx)(A.a,{"aria-label":"left",icon:Object(H.jsx)(ye.a,{}),disabled:h<=0,onClick:()=>O(h-1)}),Object(H.jsxs)(_.a,{children:[h+1," of"," ",i?Math.ceil((null===i||void 0===i?void 0:i.systemTokenTransfersByToId.totalCount)/Ne):1]}),Object(H.jsx)(A.a,{disabled:h>=Math.ceil((null===i||void 0===i?void 0:i.systemTokenTransfersByToId.totalCount)/Ne),"aria-label":"left",icon:Object(H.jsx)(ve.a,{}),onClick:()=>O(h+1)})]})]})]})]})]})})]})};const Fe=J.a`
  query QueryAccounts($offset: Int!, $pageSize: Int!) {
    systemTokenTransfers(offset: $offset, first: $pageSize, orderBy: ID_ASC) {
      nodes {
        id
        fromId
        toId
        amount
        timestamp
        extrinsicId
      }
      totalCount
    }
  }
`;var Le=()=>{const[e,t]=Object(s.useState)(0),[c,n]=Object(s.useState)(!1),{loading:i,data:a,stopPolling:j,startPolling:l}=Object(oe.a)(Fe,{variables:{offset:20*e,pageSize:20}});return Object(s.useEffect)((()=>(l(15e3),()=>j())),[l,j]),Object(H.jsxs)("div",{children:[Object(H.jsx)(Se,{}),Object(H.jsx)(_.a,{p:5,background:"white",mt:5,boxShadow:"sm",borderRadius:"lg",children:i?Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})}):Object(H.jsxs)(ge.a,{variant:"simple",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:[Object(H.jsx)(ge.e,{children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{children:"ID"}),Object(H.jsx)(ge.d,{children:"From"}),Object(H.jsx)(ge.d,{children:"To"}),Object(H.jsx)(ge.d,{children:"Amount"}),Object(H.jsx)(ge.d,{children:"Extrinsic"})]})}),Object(H.jsx)(ge.b,{children:null===a||void 0===a?void 0:a.systemTokenTransfers.nodes.map((({id:e,fromId:t,toId:c,amount:s,extrinsicId:n,timestamp:i})=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)($.a,{as:b.b,to:`/transfers/${e}`,color:"blue.600",children:e})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/accounts/${t}`,color:"blue.600",children:[t.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/accounts/${c}`,color:"blue.600",children:[c.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:C(s)}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/extrinsics/${n}`,color:"blue.600",children:[n.substr(0,10),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:3,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"sm",children:d()(i).add(8,"hours").toNow(!0)})]})})]},`transfer-${e}`)))})]})}),Object(H.jsxs)(T.a,{align:"center",justify:"space-between",mt:4,children:[Object(H.jsx)("div",{style:{flexGrow:1}}),Object(H.jsxs)(P.a,{children:[Object(H.jsx)(A.a,{"aria-label":"left",icon:Object(H.jsx)(ye.a,{}),disabled:e<=0,onClick:()=>t(e-1)}),Object(H.jsxs)(_.a,{children:[e+1," of"," ",a?Math.ceil((null===a||void 0===a?void 0:a.systemTokenTransfers.totalCount)/20):1]}),Object(H.jsx)(A.a,{disabled:e>=Math.ceil((null===a||void 0===a?void 0:a.systemTokenTransfers.totalCount)/20),"aria-label":"left",icon:Object(H.jsx)(ve.a,{}),onClick:()=>t(e+1)})]})]})]})};const We=J.a`
  query TransferDetail($id: String!) {
    systemTokenTransfer(id: $id) {
      id
      fromId
      toId
      amount
      timestamp
      extrinsicId
      extrinsic {
        block {
          id
          number
        }
      }
    }
  }
`;var Ue=()=>{const{id:e}=Object(x.j)(),[t,c]=Object(s.useState)(),[n,i]=Object(s.useState)(!1),[a,j]=Object(s.useState)(0),{loading:l,data:r,startPolling:o,stopPolling:h}=(Object(x.i)(),Object(oe.a)(We,{variables:{id:e}}));return Object(s.useEffect)((()=>(o(2e4),()=>h())),[]),Object(s.useEffect)((()=>{c(r?r.systemTokenTransfer:null)}),[r]),Object(s.useEffect)((()=>{if(t){let e=d()(t.timestamp).add(8,"hours").diff(d()(),"seconds");j(e),i(e<-12)}}),[t]),Object(H.jsxs)("div",{children:[Object(H.jsxs)(T.a,{justify:"space-between",align:"center",children:[Object(H.jsx)(ae.a,{as:"h6",size:"sm",children:"Transfer Detail"}),Object(H.jsx)(Se,{})]}),Object(H.jsx)(_.a,{mt:5,p:4,background:"white",boxShadow:"sm",borderRadius:"lg",children:t?Object(H.jsx)(ge.a,{variant:"simple",children:Object(H.jsxs)(ge.b,{children:[Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"ID"})}),Object(H.jsx)(ge.c,{children:e})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Timestamp"})}),Object(H.jsx)(ge.c,{children:t.timestamp})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Status"})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,children:[Object(H.jsx)(Ce.a,{color:"green.400",size:"28px",value:Math.abs(100*a/12),children:n&&Object(H.jsx)(Ce.b,{children:Object(H.jsx)(U.a,{as:ze.a,boxSize:3,color:"green.400"})})}),Object(H.jsx)(W.a,{children:n?"Confirmed":"Pending"})]})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"From"})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(T.a,{align:"center",children:[Object(H.jsx)($.a,{as:b.b,to:`/accounts/${t.fromId}`,color:"blue.600",children:t.fromId}),Object(H.jsx)(Ee,{value:t.fromId})]})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"To"})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(T.a,{align:"center",children:[Object(H.jsx)($.a,{as:b.b,to:`/accounts/${t.toId}`,color:"blue.600",children:t.toId}),Object(H.jsx)(Ee,{value:t.toId})]})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Amount"})}),Object(H.jsx)(ge.c,{children:C(t.amount)})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Block Hash"})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(T.a,{align:"center",children:[Object(H.jsx)($.a,{as:b.b,to:`/blocks/${t.extrinsic.block.id}`,color:"blue.600",children:t.extrinsic.block.id}),Object(H.jsx)(Ee,{value:t.extrinsic.block.id})]})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Block Number"})}),Object(H.jsx)(ge.c,{children:t.extrinsic.block.number})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Block time"})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:3,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"sm",children:d()(t.timestamp).add(8,"hours").toNow(!0)})]})})]})]})}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})})})]})};const Ge=J.a`
  query ExtrinsicDetail($id: String!) {
    extrinsic(id: $id) {
      id
      timestamp
      signature
      signer {
        id
      }
      nonce
      block {
        number
      }
      section
      method
      events {
        nodes {
          section
          method
          data
        }
      }
    }
  }
`;var Ye=()=>{const{id:e}=Object(x.j)(),[t,c]=Object(s.useState)(),{loading:n,data:i,startPolling:a,stopPolling:j}=Object(oe.a)(Ge,{variables:{id:e}});return Object(s.useEffect)((()=>(a(1e3),()=>j())),[]),Object(s.useEffect)((()=>{c(i?i.extrinsic:null)}),[i]),Object(H.jsxs)("div",{children:[Object(H.jsxs)(T.a,{justify:"space-between",align:"center",children:[Object(H.jsx)(ae.a,{as:"h6",size:"sm",children:"Extrinsic Detail"}),Object(H.jsx)(Se,{})]}),Object(H.jsx)(_.a,{mt:5,p:4,background:"white",boxShadow:"sm",borderRadius:"lg",children:t?Object(H.jsx)(ge.a,{variant:"simple",children:Object(H.jsxs)(ge.b,{children:[Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Timestamp"})}),Object(H.jsx)(ge.c,{children:d()(null===t||void 0===t?void 0:t.timestamp).add(8,"hours").format("YYYY-MM-DD HH:mm:ss")})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Block"})}),Object(H.jsx)(ge.c,{children:Object(H.jsx)($.a,{as:b.b,to:`/blocks/${t.block.number}`,color:"blue.600",children:Object(H.jsxs)(ae.a,{as:"h6",size:"sm",children:["#",t.block.number]})})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Hash"})}),Object(H.jsx)(ge.c,{children:t.id})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Section"})}),Object(H.jsx)(ge.c,{children:Object(H.jsx)(de.a,{size:"sm",colorScheme:"cyan",children:t.section})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Method"})}),Object(H.jsx)(ge.c,{children:Object(H.jsx)(de.a,{size:"sm",variant:"outline",colorScheme:"cyan",children:t.method})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Signer"})}),Object(H.jsx)(ge.c,{children:Object(H.jsx)($.a,{as:b.b,to:`/accounts/${t.signer.id}`,color:"blue.600",children:Object(H.jsx)(W.a,{children:t.signer.id})})})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Nonce"})}),Object(H.jsx)(ge.c,{children:t.nonce})]}),Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsx)(ae.a,{as:"h6",size:"xs",children:"Signature"})}),Object(H.jsx)(ge.c,{children:Object(H.jsx)(_.a,{p:4,background:"blackAlpha.50",children:Object(H.jsx)(_.a,{p:2,background:"white",children:Object(H.jsx)(W.a,{wordBreak:"break-all",children:t.signature})})})})]})]})}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})})}),Object(H.jsx)(_.a,{mt:5,p:4,background:"white",boxShadow:"sm",borderRadius:"lg",children:Object(H.jsxs)(Ie.e,{children:[Object(H.jsx)(Ie.b,{children:Object(H.jsx)(Ie.a,{children:"Logs"})}),Object(H.jsx)(Ie.d,{children:Object(H.jsx)(Ie.c,{children:t?Object(H.jsxs)(ge.a,{children:[Object(H.jsx)(ge.e,{background:"teal.50",children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{}),Object(H.jsx)(ge.d,{children:"Method"}),Object(H.jsx)(ge.d,{children:"Data"})]})}),Object(H.jsx)(ge.b,{children:t.events.nodes.map((({section:t,method:c,data:s},n)=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:n}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(de.a,{size:"sm",colorScheme:"cyan",children:[t,".",c]})}),Object(H.jsx)(ge.c,{children:s})]},`extrinsic-${e}`)))})]}):Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})})})})]})})]})};const Ke=J.a`
  query QueryExtrinsics($offset: Int!, $pageSize: Int!) {
    extrinsics(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
      nodes {
        id
        section
        method
        timestamp
        events {
          totalCount
        }
        block {
          number
        }
      }
      totalCount
    }
  }
`;var Qe=()=>{const[e,t]=Object(s.useState)(0),[c,n]=Object(s.useState)(!1),{loading:i,data:a,stopPolling:j,startPolling:l}=Object(oe.a)(Ke,{variables:{offset:20*e,pageSize:20}});return Object(s.useEffect)((()=>(l(1e3),()=>j())),[l,j]),console.log(a),Object(H.jsxs)("div",{children:[Object(H.jsx)(Se,{}),Object(H.jsx)(_.a,{p:5,background:"white",mt:5,boxShadow:"sm",borderRadius:"lg",children:i?Object(H.jsx)(_.a,{p:10,display:"flex",alignItems:"center",justifyContent:"center",children:Object(H.jsx)(u.a,{})}):Object(H.jsxs)(ge.a,{variant:"simple",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:[Object(H.jsx)(ge.e,{children:Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.d,{children:"Hash"}),Object(H.jsx)(ge.d,{children:"Timestamp"}),Object(H.jsx)(ge.d,{children:"Section"}),Object(H.jsx)(ge.d,{children:"Method"}),Object(H.jsx)(ge.d,{children:"Block"})]})}),Object(H.jsx)(ge.b,{children:null===a||void 0===a?void 0:a.extrinsics.nodes.map((({id:e,timestamp:t,events:c,section:s,method:n,block:i})=>Object(H.jsxs)(ge.f,{children:[Object(H.jsx)(ge.c,{children:Object(H.jsxs)($.a,{as:b.b,to:`/extrinsics/${e}`,color:"blue.600",children:[e.substr(32),"..."]})}),Object(H.jsx)(ge.c,{children:Object(H.jsxs)(P.a,{spacing:2,mt:1,children:[Object(H.jsx)(U.a,{as:be.a,ml:3,boxSize:4,color:"yellow.600"}),Object(H.jsx)(W.a,{color:"grey",fontSize:"md",children:d()(t).add(8,"hours").toNow(!0)})]})}),Object(H.jsx)(ge.c,{children:Object(H.jsx)(de.a,{size:"sm",colorScheme:"cyan",children:s})}),Object(H.jsx)(ge.c,{children:Object(H.jsx)(de.a,{size:"sm",colorScheme:"cyan",variant:"outline",children:n})}),Object(H.jsx)(ge.c,{children:Object(H.jsx)($.a,{as:b.b,to:`/blocks/${i.number}`,color:"blue.600",children:Object(H.jsxs)(ae.a,{as:"h6",size:"sm",children:["#",i.number]})})})]},`extrinsic-${e}`)))})]})}),Object(H.jsxs)(T.a,{align:"center",justify:"space-between",mt:4,children:[Object(H.jsx)("div",{style:{flexGrow:1}}),Object(H.jsxs)(P.a,{children:[Object(H.jsx)(A.a,{"aria-label":"left",icon:Object(H.jsx)(ye.a,{}),disabled:e<=0,onClick:()=>t(e-1)}),Object(H.jsxs)(_.a,{children:[e+1," of"," ",a?Math.ceil((null===a||void 0===a?void 0:a.extrinsics.totalCount)/20):1]}),Object(H.jsx)(A.a,{disabled:e>=Math.ceil((null===a||void 0===a?void 0:a.extrinsics.totalCount)/20),"aria-label":"left",icon:Object(H.jsx)(ve.a,{}),onClick:()=>t(e+1)})]})]})]})};var Ve=function(){const[e,t]=Object(s.useState)(),[c,n]=Object(s.useState)(),i=new URLSearchParams(window.location.search).get("appchain");return Object(s.useEffect)((()=>{(async()=>{try{if(!i)return void t(null);const e=await window.getAppchainInfo(i);await async function(e){w=e;const t=new g.a(e.rpc_endpoint);k=await y.a.create({provider:t})}(e),t(e)}catch(e){console.log(e),t(null)}})()}),[i]),Object(s.useEffect)((()=>{e&&n(new m.a({uri:e.subql_endpoint,cache:new f.a}))}),[e]),Object(H.jsx)(h.a,{children:c?Object(H.jsx)(p.a,{client:c,children:Object(H.jsx)(b.a,{children:Object(H.jsx)(x.e,{children:Object(H.jsxs)(x.c,{path:"/",element:Object(H.jsx)(ie,{}),children:[Object(H.jsx)(x.c,{path:"",element:Object(H.jsx)(x.a,{to:"home"})}),Object(H.jsx)(x.c,{path:"home",element:Object(H.jsx)(pe,{})}),Object(H.jsx)(x.c,{path:"blocks",element:Object(H.jsx)(we,{})}),Object(H.jsx)(x.c,{path:"blocks/:id",element:Object(H.jsx)(Me,{})}),Object(H.jsx)(x.c,{path:"accounts",element:Object(H.jsx)(Re,{})}),Object(H.jsx)(x.c,{path:"accounts/:id",element:Object(H.jsx)(He,{})}),Object(H.jsx)(x.c,{path:"transfers",element:Object(H.jsx)(Le,{})}),Object(H.jsx)(x.c,{path:"transfers/:id",element:Object(H.jsx)(Ue,{})}),Object(H.jsx)(x.c,{path:"extrinsics",element:Object(H.jsx)(Qe,{})}),Object(H.jsx)(x.c,{path:"extrinsics/:id",element:Object(H.jsx)(Ye,{})})]})})})}):Object(H.jsx)(O.a,{h:"100vh",children:Object(H.jsx)(u.a,{thickness:"4px",speed:"0.65s",emptyColor:"gray.200",color:"gray.500",size:"lg"})})})};d.a.extend(r.a);const Je=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_OCT_NETWORK||"testnet",Xe=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_OCT_REGISTRY_CONTRACT_NAME||"registry.test_oct.testnet",Ze={networkId:Je,nodeUrl:`https://rpc.${Je}.near.org`,contractName:Xe,walletUrl:`https://wallet.${Je}.near.org`,helperUrl:`https://helper.${Je}.near.org`,explorerUrl:`https://explorer.${Je}.near.org`,tokenDecimal:18};(async()=>{const e=await Object(j.connect)(Object.assign({deps:{keyStore:new j.keyStores.BrowserLocalStorageKeyStore}},Ze));window.walletConnection=new j.WalletConnection(e,"octopus_bridge"),window.registry=await new j.Contract(window.walletConnection.account(),Xe,{viewMethods:["get_appchain_status_of"],changeMethods:[]}),window.getAppchainInfo=async e=>{console.log("appchain_id",e);const t=await window.registry.get_appchain_status_of({appchain_id:e}),c=t.appchain_anchor;window.anchor=await new j.Contract(window.walletConnection.account(),c,{viewMethods:["get_appchain_settings"],changeMethods:[]});let s=await window.anchor.get_appchain_settings({});return s={...s,...t},console.log("appchainInfo",s),s}})().then((()=>{a.a.render(Object(H.jsx)(n.a.StrictMode,{children:Object(H.jsx)(Ve,{})}),document.getElementById("root"))}))}},[[285,1,2]]]);
//# sourceMappingURL=main.e859dc03.chunk.js.map