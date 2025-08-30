<template>
  <div class="privacy-container">
    <div class="privacy-content">
      <h1 class="main-title">隐私政策</h1>
      
      <div class="section">
        <h2>1. 信息收集</h2>
        <p>我们可能收集以下类型的信息：</p>
        <ul>
          <li>您主动提供的信息（如用户名、邮箱地址）</li>
          <li>您上传的素材文件和相关描述信息</li>
          <li>使用平台时自动收集的技术信息（如IP地址、浏览器类型）</li>
        </ul>
      </div>

      <div class="section">
        <h2>2. 信息使用</h2>
        <p>我们收集的信息将用于：</p>
        <ul>
          <li>提供和改进平台服务</li>
          <li>管理用户账户和素材</li>
          <li>与用户沟通重要信息</li>
          <li>确保平台安全和防止滥用</li>
        </ul>
      </div>

      <div class="section">
        <h2>3. 版权责任声明</h2>
        <div class="warning-box">
          <h3>⚠️ 重要提醒</h3>
          <p><strong>严禁上传他人作品并冒充为自己的创作！</strong></p>
          <ul>
            <li>用户不得盗取、复制他人的图片、设计作品或其他素材</li>
            <li>不得将他人的作品修改后声称为自己原创</li>
            <li>不得使用他人享有版权的素材而不注明原作者</li>
          </ul>
          <p class="consequence"><strong>违规后果自负：</strong>用户因侵犯他人版权而产生的所有法律纠纷、经济损失和法律责任，均由用户本人承担，平台不承担任何责任。</p>
        </div>
      </div>

      <div class="section">
        <h2>4. 信息共享</h2>
        <p>我们不会向第三方出售、交易或转让您的个人信息，除非：</p>
        <ul>
          <li>获得您的明确同意</li>
          <li>法律法规要求</li>
          <li>保护平台和用户的合法权益需要</li>
        </ul>
      </div>

      <div class="section">
        <h2>5. 政策更新</h2>
        <p>我们可能会不时更新本隐私政策。重大更改时，我们会通过平台通知或邮件提醒您。</p>
      </div>

      <div class="section">
        <h2>6. 联系我们</h2>
        <p>如对本隐私政策有任何疑问，请通过平台联系页面与我们取得联系。</p>
      </div>

      <p class="last-updated">最后更新：2025年8月29日</p>
    </div>
  </div>
</template>

<script setup name="Privacy">
</script>

<style scoped>
.privacy-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  line-height: 1.6;
  color: #333;
}

.privacy-content {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-title {
  font-size: 32px;
  font-weight: 600;
  color: #007AFF;
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 3px solid #007AFF;
  padding-bottom: 16px;
}

.section {
  margin-bottom: 32px;
}

.section h2 {
  font-size: 20px;
  font-weight: 550;
  color: #2c3e50;
  margin-bottom: 16px;
  border-left: 4px solid #007AFF;
  padding-left: 12px;
}

.section h3 {
  font-size: 18px;
  font-weight: 500;
  color: #34495e;
  margin: 16px 0 12px 0;
}

.section p {
  font-size: 16px;
  margin-bottom: 12px;
  text-align: justify;
}

.section ul {
  margin: 12px 0;
  padding-left: 24px;
}

.section li {
  font-size: 16px;
  margin-bottom: 8px;
}

.warning-box {
  background: linear-gradient(135deg, #fff5f5 0%, #ffeaea 100%);
  border: 2px solid #e74c3c;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.warning-box h3 {
  color: #c0392b;
  font-size: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.warning-box p {
  color: #2c3e50;
  font-weight: 500;
}

.warning-box ul {
  margin: 16px 0;
}

.warning-box li {
  color: #34495e;
  margin-bottom: 8px;
}

.consequence {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  padding: 12px;
  margin-top: 16px;
  color: #721c24 !important;
  font-weight: 600 !important;
}

.last-updated {
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ecf0f1;
}
</style>
