# kevinfszu.github.io
# 个人作品集
@(2--Coder)[作品集]

1. [分步填写注册内容](http://kevinfszu.github.io/portfolio/divide_pace_register/)
2. [网页右下角toolbar](http://kevinfszu.github.io/portfolio/site-toolbar/)
	模仿的是[腾讯客服](http://kf.qq.com/)中的效果
	也可以参考[慕课网](http://www.imooc.com/)
3. [回到顶部](http://kevinfszu.github.io/portfolio/back-to-the-top/index.html)
	模仿的是[自然志](http://ziranzhi.com/)
4. [转前端工作时被安排做的一个小考试](http://kevinfszu.github.io/portfolio/first-test-of-my-work/index.html)
5. [网站水平导航栏](http://kevinfszu.github.io/portfolio/horizontal-navbar/index.html)
	模仿的是[腾讯Bugly](https://bugly.qq.com)
    子导航的小箭头，Bugly 原来是用图片来实现的，我改用伪元素来实现，但目前有一个小缺点：小箭头是实心的，与子导航的融合略微不够。其改善方案可以参考 [Twitter](https://twitter.com/) 中的实现。

    简述一下 Twitter 中空心小箭头的实现原理：做两个小箭头，一个箭头（caret-outer）为灰色，另一个箭头（caret-inner）为白色，然后将caret-inner覆盖到caret-outer上，并且caret-inner往下移动 1px 以便caret-outer露出 1px 的灰色。

```
  <div class="dropdown-caret">
    <span class="caret-outer"></span>
    <span class="caret-inner"></span>
  </div>
  
<style>
	.dropdown-caret .caret-outer {
	    border-bottom: 10px solid #8899a6;
	    border-bottom-color: rgba(0,0,0,0.1);
	    border-left: 10px solid transparent;
	    border-right: 10px solid transparent;
	    height: auto;
	    left: 0;
	    top: 0;
	    width: auto;
	}
	.dropdown-caret .caret-outer, .dropdown-caret .caret-inner {
	    position: absolute;
	    top: 0;
	    left: 0;
	    display: inline-block;
	    margin-left: -1px;
	}

	.dropdown-caret .caret-inner {
	    top: 1px;
	    left: 1px;
	    border-left: 9px solid transparent;
	    border-right: 9px solid transparent;
	    border-bottom: 9px solid #fff;
	    border-bottom-color: rgba(255,255,255,0.98);
	}
	.dropdown-caret .caret-outer, .dropdown-caret .caret-inner {
	    position: absolute;
	    top: 0;
	    left: 0;
	    display: inline-block;
	    margin-left: -1px;
	}
</style>
```

5. [网站水平导航栏-2](http://kevinfszu.github.io/portfolio/horizontal-navbar-2/index.html)
	模仿的是[某个个人博客](http://ghmagical.com/ceditor/modules/)。类似的有：[蚂蚁金融云](https://auth.cloud.alipay.com/#/cloudauth/login?goto=https://user.cloud.alipay.com/#/dashboard)
	
	感觉比较适用于没有子导航的导航栏。
	
	重点在于利用 ::after 元素和 CSS3 动画属性实现的 hover 效果。
	用到实际项目中还要加上：点击之后的持久的激活状态效果。

6. [网站页脚](http://kevinfszu.github.io/portfolio/site-footer/index.html)
	模仿的是[腾讯Bugly](https://bugly.qq.com)

6. [信息展示框](http://kevinfszu.github.io/portfolio/display-box/index.html)
	模仿的是[蚂蚁金融云](https://www.cloud.alipay.com/)

