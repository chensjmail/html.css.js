/**
 * <pre>
 * 选项说明:
 * autoCheckPerc:自动检测进度的回调方法
 * finishCall:进度完成的回调方法
 * speed:设置进度条动画显示速度,默认500毫秒
 * height:设置进度条高度,默认为 20
 * width:设置进度条宽度,默认为 0;
 * widthUnit:进度条宽度值单位,默认为 px
 * shwoValue:显示值的方式,none 不显示; inse 嵌入进度条显示; tip 提示块显示;,默认为 none
 * 
 * 样例:
 * var pb;
 * var perc= 0.0;
 * pb=new $ProgressBar$(null, {
 * 	height:20,
 * 	width:800,
 * 	shwoValue:'tip',
 * 	speed:1000,
 * 	autoCheckPerc:function(){
 * 		return perc+= 0.019;
 * 	},
 * 	finishCall:function(){
 * 		alert(&quot;完成&quot;);
 * 	}
 * });
 * </pre>
 */
var $ProgressBar$= (function(jquery_, document_){

	function initStyleTag(){
		var _styleTags= [];
		_styleTags[_styleTags.length]= '<style type="text/css">';
		_styleTags[_styleTags.length]= '\n	.progressbar {';
		_styleTags[_styleTags.length]= '\n		position: relative;';
		_styleTags[_styleTags.length]= '\n		border-bottom: 1px solid rgba(255, 255, 255, 0.25);';
		_styleTags[_styleTags.length]= '\n		-webkit-box-shadow: 0px 4px 4px -4px rgba(255, 255, 255, 0.4), 0px -3px 3px -3px rgba(255, 255, 255, 0.25), inset 0px 0px 12px 0px rgba(0, 0, 0, 0.5);';
		_styleTags[_styleTags.length]= '\n		box-shadow: 0px 4px 4px -4px rgba(255, 255, 255, 0.4), 0px -3px 3px -3px rgba(255, 255, 255, 0.25), inset 0px 0px 12px 0px rgba(0, 0, 0, 0.5);';
		_styleTags[_styleTags.length]= '\n		-webkit-border-radius: 20px;';
		_styleTags[_styleTags.length]= '\n		border-radius: 20px;';
		_styleTags[_styleTags.length]= '\n	}';
		_styleTags[_styleTags.length]= '\n	.progressbar>.bar {';
		_styleTags[_styleTags.length]= '\n		position: relative;';
		_styleTags[_styleTags.length]= '\n		width: 20px;';
		_styleTags[_styleTags.length]= '\n		background-size: 3em 3em;';
		_styleTags[_styleTags.length]= '\n		background-color: #6DA807;';
		_styleTags[_styleTags.length]= '\n		background-image: linear-gradient(-45deg, transparent 0em, transparent 0.8em, #96D923 0.9em, #96D923 2.1em, transparent 2.1em, transparent 2.9em, #96D923 3.1em);';
		_styleTags[_styleTags.length]= '\n		-webkit-box-shadow: 0px 4px 4px -4px rgba(255, 255, 255, 0.4), 0px -3px 3px -3px rgba(255, 255, 255, 0.25), inset 0px 0px 12px 0px rgba(0, 0, 0, 0.5);';
		_styleTags[_styleTags.length]= '\n		background-image: linear-gradient(-45deg, transparent 0em, transparent 0.8em, #96D923 0.9em, #96D923 2.1em, transparent 2.1em, transparent 2.9em, #96D923 3.1em);';
		_styleTags[_styleTags.length]= '\n -webkit-border-radius: 10px;';
		_styleTags[_styleTags.length]= '\n border-radius: 10px;';
		_styleTags[_styleTags.length]= '\n		-webkit-animation: warning-animation 750ms infinite linear;';
		_styleTags[_styleTags.length]= '\n		-moz-animation: warning-animation 750ms infinite linear;';
		_styleTags[_styleTags.length]= '\n		animation: warning-animation 750ms infinite linear;';
		_styleTags[_styleTags.length]= '\n	}';
		_styleTags[_styleTags.length]= '\n	.progressbar>.bar>.perc {';
		_styleTags[_styleTags.length]= '\n		text-align: right;';
		_styleTags[_styleTags.length]= '\n		margin-right: 5px;';
		_styleTags[_styleTags.length]= '\n		font-weight: bold;';
		_styleTags[_styleTags.length]= '\n	}';
		_styleTags[_styleTags.length]= '\n	.progressbar>.label {';
		_styleTags[_styleTags.length]= '\n		font-family: "Aldrich", sans-serif;';
		_styleTags[_styleTags.length]= '\n		position: absolute;';
		_styleTags[_styleTags.length]= '\n		display: block;';
		_styleTags[_styleTags.length]= '\n		width: 40px;';
		_styleTags[_styleTags.length]= '\n		height: 30px;';
		_styleTags[_styleTags.length]= '\n		line-height: 30px;';
		_styleTags[_styleTags.length]= '\n		background: rgb(76, 76, 76);';
		_styleTags[_styleTags.length]= '\n		background: -moz-linear-gradient(top, rgba(76, 76, 76, 1) 0%, rgba(38, 38, 38, 1) 100%);';
		_styleTags[_styleTags.length]= '\n		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(76, 76, 76, 1)), color-stop(100%, rgba(38, 38, 38, 1)));';
		_styleTags[_styleTags.length]= '\n		background: -webkit-linear-gradient(top, rgba(76, 76, 76, 1) 0%, rgba(38, 38, 38, 1) 100%);';
		_styleTags[_styleTags.length]= '\n		background: -o-linear-gradient(top, rgba(76, 76, 76, 1) 0%, rgba(38, 38, 38, 1) 100%);';
		_styleTags[_styleTags.length]= '\n		background: -ms-linear-gradient(top, rgba(76, 76, 76, 1) 0%, rgba(38, 38, 38, 1) 100%);';
		_styleTags[_styleTags.length]= '\n		background: linear-gradient(to bottom, rgba(76, 76, 76, 1) 0%, rgba(38, 38, 38, 1) 100%);';
		_styleTags[_styleTags.length]= '\n		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#4c4c4c", endColorstr="#262626", GradientType=0);';
		_styleTags[_styleTags.length]= '\n		font-weight: bold;';
		_styleTags[_styleTags.length]= '\n		font-size: 12px;';
		_styleTags[_styleTags.length]= '\n		color: #fff;';
		_styleTags[_styleTags.length]= '\n		text-align: center;';
		_styleTags[_styleTags.length]= '\n		-webkit-border-radius: 6px;';
		_styleTags[_styleTags.length]= '\n		border-radius: 6px;';
		_styleTags[_styleTags.length]= '\n		-webkit-box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);';
		_styleTags[_styleTags.length]= '\n		box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);';
		_styleTags[_styleTags.length]= '\n		text-shadow: 0px 0px 0px #000000, 1px 1px 1px #000000;';
		_styleTags[_styleTags.length]= '\n		filter: dropshadow(color = #000000, offx = 0, offy = -1);';
		_styleTags[_styleTags.length]= '\n	}';
		_styleTags[_styleTags.length]= '\n	.progressbar>.label>span {';
		_styleTags[_styleTags.length]= '\n		position: absolute;';
		_styleTags[_styleTags.length]= '\n		display: block;';
		_styleTags[_styleTags.length]= '\n		width: 12px;';
		_styleTags[_styleTags.length]= '\n		height: 9px;';
		_styleTags[_styleTags.length]= '\n		top: -8px;';
		_styleTags[_styleTags.length]= '\n		left: 13px;';
		_styleTags[_styleTags.length]= '\n		background: transparent;';
		_styleTags[_styleTags.length]= '\n		overflow: hidden;';
		_styleTags[_styleTags.length]= '\n	}';
		_styleTags[_styleTags.length]= '\n	.progressbar>.label>span:before {';
		_styleTags[_styleTags.length]= '\n		position: absolute;';
		_styleTags[_styleTags.length]= '\n		display: block;';
		_styleTags[_styleTags.length]= '\n		content: "";';
		_styleTags[_styleTags.length]= '\n		width: 8px;';
		_styleTags[_styleTags.length]= '\n		height: 8px;';
		_styleTags[_styleTags.length]= '\n		top: 4px;';
		_styleTags[_styleTags.length]= '\n		left: 2px;';
		_styleTags[_styleTags.length]= '\n		background: rgb(86, 86, 86);';
		_styleTags[_styleTags.length]= '\n		background: -moz-linear-gradient(-45deg, rgba(86, 86, 86, 1) 0%, rgba(76, 76, 76, 1) 50%);';
		_styleTags[_styleTags.length]= '\n		background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(86, 86, 86, 1)), color-stop(50%, rgba(76, 76, 76, 1)));';
		_styleTags[_styleTags.length]= '\n		background: -webkit-linear-gradient(-45deg, rgba(86, 86, 86, 1) 0%, rgba(76, 76, 76, 1) 50%);';
		_styleTags[_styleTags.length]= '\n		background: -o-linear-gradient(-45deg, rgba(86, 86, 86, 1) 0%, rgba(76, 76, 76, 1) 50%);';
		_styleTags[_styleTags.length]= '\n		background: -ms-linear-gradient(-45deg, rgba(86, 86, 86, 1) 0%, rgba(76, 76, 76, 1) 50%);';
		_styleTags[_styleTags.length]= '\n		background: linear-gradient(135deg, rgba(86, 86, 86, 1) 0%, rgba(76, 76, 76, 1) 50%);';
		_styleTags[_styleTags.length]= '\n		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#565656", endColorstr="#4c4c4c", GradientType=1);';
		_styleTags[_styleTags.length]= '\n		-webkit-box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.15);';
		_styleTags[_styleTags.length]= '\n		box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.15);';
		_styleTags[_styleTags.length]= '\n		-moz-transform: rotate(45deg);';
		_styleTags[_styleTags.length]= '\n		-webkit-transform: rotate(45deg);';
		_styleTags[_styleTags.length]= '\n		-o-transform: rotate(45deg);';
		_styleTags[_styleTags.length]= '\n		-ms-transform: rotate(45deg);';
		_styleTags[_styleTags.length]= '\n		transform: rotate(45deg);';
		_styleTags[_styleTags.length]= '\n	}';
		_styleTags[_styleTags.length]= '\n	@-webkit-keyframes warning-animation {';
		_styleTags[_styleTags.length]= '\n	  0% {';
		_styleTags[_styleTags.length]= '\n	    background-position: 0 0;';
		_styleTags[_styleTags.length]= '\n	  }';
		_styleTags[_styleTags.length]= '\n	  100% {';
		_styleTags[_styleTags.length]= '\n	    background-position: 3em 0;';
		_styleTags[_styleTags.length]= '\n	  }';
		_styleTags[_styleTags.length]= '\n	}';
		_styleTags[_styleTags.length]= '\n	@-moz-keyframes warning-animation {';
		_styleTags[_styleTags.length]= '\n	  0% {';
		_styleTags[_styleTags.length]= '\n	    background-position: 0 0;';
		_styleTags[_styleTags.length]= '\n	  }';
		_styleTags[_styleTags.length]= '\n	  100% {';
		_styleTags[_styleTags.length]= '\n	    background-position: 3em 0;';
		_styleTags[_styleTags.length]= '\n	  }';
		_styleTags[_styleTags.length]= '\n	}';
		_styleTags[_styleTags.length]= '\n	@keyframes warning-animation {';
		_styleTags[_styleTags.length]= '\n	  0% {';
		_styleTags[_styleTags.length]= '\n	    background-position: 0 0;';
		_styleTags[_styleTags.length]= '\n	  }';
		_styleTags[_styleTags.length]= '\n	  100% {';
		_styleTags[_styleTags.length]= '\n	    background-position: 3em 0;';
		_styleTags[_styleTags.length]= '\n	  }';
		_styleTags[_styleTags.length]= '\n	}';
		_styleTags[_styleTags.length]= '\n</style>';
		jquery_(document_.head).append(_styleTags.join(''));
	}

	// 添加样式代码
	initStyleTag();

	return function(containerId_, options_){
		options_= options_ || {};
		/* 自动检测进度的回调方法 */
		options_.autoCheckPerc;
		/* 进度完成的回调方法 */
		options_.finishCall= options_.finishCall || function(){
		};
		/* 设置进度条动画显示速度,默认500毫秒 */
		options_.speed= options_.speed || 500;
		/* 设置进度条高度 */
		options_.height= options_.height || 20;
		/* 设置进度条宽度 */
		options_.width= options_.width || 0;
		/* 进度条宽度值单位,默认为 px */
		options_.widthUnit= options_.widthUnit || 'px';
		/* 显示值的方式,默认为 none, none 不显示; inse 嵌入进度条显示; tip 提示块显示; */
		options_.shwoValue= options_.shwoValue || "none";

		var _container= jquery_(containerId_ ? ("#" + containerId_) : document_.body);
		var _progress_bar_id= randomString();
		var _progressbar_id= '#' + _progress_bar_id + '.progressbar';
		var _bar_id= '#' + _progress_bar_id + '.progressbar>.bar';
		var _bar_insert_perc_id= _bar_id + '>.perc';
		var _bar_lable_id= '#' + _progress_bar_id + '.progressbar>.label';
		var _bar_lable_text_id= '#' + _progress_bar_id + '.progressbar .perc';
		var _progressbar, _bar, _bar_label, _bar_label_text;
		var _timer_interval_Id;
		init();

		function randomString(len_){
			len_= len_ || 32;
			/** **默认去掉了容易混淆的字符g9,oOl,Vv,Uu,I1*** */
			var _chars= 'ABCDEFGHJKLMNPQRSTWXYZabcdefhijkmnpqrstwxyz2345678';
			var _maxPos= _chars.length;
			var _pwd= '';
			for(i= 0;i < len_;i++){
				_pwd+= _chars.charAt(Math.floor(Math.random() * _maxPos));
			}
			return _pwd;
		}

		function getContainer(){
			var _tmps= [];
			_tmps[_tmps.length]= '<div id="' + _progress_bar_id + '" class="progressbar">';
			_tmps[_tmps.length]= '<div class="bar">';
			_tmps[_tmps.length]= options_.shwoValue === 'inse' ? '<div class="perc"></div></div>' : '';
			_tmps[_tmps.length]= '</div>';
			_tmps[_tmps.length]= options_.shwoValue === 'tip' ? '<div class="label"><div class="perc">0%</div><span></span></div>' : '';
			_tmps[_tmps.length]= '</div>';
			return _tmps.join('');
		}

		function init(){
			_container.append(getContainer());
			// 初始化动态变量
			_progressbar= jquery_(_progressbar_id);
			_bar= jquery_(_bar_id);
			_bar_label= jquery_(_bar_lable_id);
			_bar_label_text= jquery_(_bar_lable_text_id);

			/* 初始化进度条宽度 */
			_progressbar.css({
				'width':' ' + (options_.width ? (options_.width + options_.widthUnit) : '100%')
			});
			/* 初始化进度条高度 */
			_progressbar.height(options_.height);
			/* 初始化当前进度div高度 */
			_bar.height(_progressbar.height());
			if(options_.shwoValue === 'tip'){
				/* 初始化提示框显示值的样式与位置 */
				_bar_label.offset({
					'top':_bar.offset().top + _bar.outerHeight() + 5.5,
					'left':_bar.offset().left + _bar.outerWidth() - Math.ceil(_bar_label.outerWidth() / 2)
				});
			}else if(options_.shwoValue === 'inse'){
				/* 初始化内嵌显示值的样式 */
				jquery_(_bar_insert_perc_id).css({
					'lineHeight':options_.height + 'px',
					'fontSize':(options_.height * 0.6) + 'px'
				});
			}
		}

		function updatePerc(rate_){
			var _progressbar_width= _progressbar.innerWidth();
			var _length= _progressbar_width * rate_;
			var _bar_min_width= 20;/* 当前进度div 的最小宽度 */
			_length= _length < _bar_min_width ? _bar_min_width : (_length > _progressbar_width ? _progressbar_width : _length);
			_bar.animate({
				width:_length
			}, {
				// 使用选项对象时speed改为duration
				duration:options_.speed,
				step:function(now_, elem){
					if(options_.shwoValue === 'tip'){
						_bar_label.offset({
							'left':_bar.offset().left + now_ - Math.ceil(_bar_label.outerWidth() / 2)
						});
					}
					var isfinish= false;
					if(now_ >= _progressbar.innerWidth()){
						now_= _progressbar.innerWidth();
						dextoryTimer();
						isfinish= true;
					}
					var _perc= now_ <= _bar_min_width ? rate_ : (now_ / _progressbar.innerWidth());
					_bar_label_text.text((Math.floor(_perc * 100)) + '%');
					if(isfinish){
						options_.finishCall.call();
					}
				}
			});
		}

		function autoDetestPerc(){
			if(jquery_.isFunction(options_.autoCheckPerc)){
				_timer_interval_Id= window.setInterval(function(){
					var _tmp= options_.autoCheckPerc.call();
					_tmp= _tmp || 0;
					updatePerc(_tmp);

				}, options_.speed + 100);
			}
		}

		function dextoryTimer(){
			if(_timer_interval_Id){
				window.clearInterval(_timer_interval_Id);
			}
		}

		function destroy(id_){
			dextoryTimer();
			id_= id_ || _progress_bar_id;
			jquery_('#' + id_ + '.progressbar').remove();
		}
		autoDetestPerc();
		this.updatePerc= updatePerc;
		this.destroy= destroy;
	};

})(jQuery, document);
