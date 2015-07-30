/**
 * 表格类型
 */
var $tables$= {
	/**
	 * 绘制固定表头的表格
	 * 
	 * @param titles_
	 *            array 列标题数据
	 * @param datas_
	 *            array 行数据
	 * @param container_id_
	 *            string 容器 div id(前缀)
	 * @param linkage_flag_
	 *            boolean 是否使用联动标识; true 是; flase 否;
	 */
	render:function(titles_, datas_, container_id_, linkage_flag_){
		// 样式名
		this.value_class= "value";
		this.increase_class= "increase";
		this.decrease_class= "decrease";

		// 容器变量
		var Containers= {// 容器对象
			main_container:jQuery('#' + container_id_),// 主容器
			table_head_table:null,// 表头表格
			table_body_table:null,// 表内容表格
			table_head_scroll_div:null,// 表头可滚动内容容器
			table_body_scroll_div:null,// 表体可滚动内容容器
			table_head_tbody:null,// 表头容器
			table_body_tbody:null,// 表体容器
		};

		// 数据变量
		var Tables= {// 表格对象
			content_total_width:0,// 总宽度px
			column_content__widths:[],// 各列的宽度
			total_width:0,// 实际总宽度px
			show_transverse_scrollber:false,// 是否出现横向滚动条
			scroll_visible_width:0,// 滚动容器可用宽度(如有纵向滚动条则不包括滚动条的宽度)
		};

		/**
		 * 初始化 html 结构
		 */
		function init(){
			// 添加表头
			var _array= [];
			_array.push('<div id="' + container_id_ + '_table_head_div" style="overflow: hidden">');
			_array.push('<table style="table-layout:auto;"  cellpadding="0" cellspacing="0" border="0">');
			_array.push('<thead>');
			_array.push('</thead>');
			_array.push('</table>');
			_array.push('</div>');
			Containers.main_container.append(_array.join(""));

			// 添加内容div
			_array= [];
			_array.push('<div id="' + container_id_ + '_table_body_div" style="overflow:auto">');
			_array.push('<table style="table-layout:auto;" cellpadding="0" cellspacing="0" border="0">');
			_array.push('<tbody>');
			_array.push('</tbody>');
			_array.push('</table>');
			_array.push('</div>');
			Containers.main_container.append(_array.join(""));

			Containers.table_head_tbody= jQuery('#' + container_id_ + '_table_head_div > table > thead');
			Containers.table_body_tbody= jQuery('#' + container_id_ + '_table_body_div > table > tbody');
			Containers.table_head_table= Containers.table_head_tbody.parent('table');
			Containers.table_body_table= Containers.table_body_tbody.parent('table');
			Containers.table_head_scroll_div= Containers.table_head_table.parent('div');
			Containers.table_body_scroll_div= Containers.table_body_table.parent('div');
			initScrollBarWidthAndBodyTableMaxVisibleWidth(Containers.main_container.innerHeight());
		}

		/**
		 * 初始体容器最大可见宽度(包括滚动条宽度)和滚动条宽度,注:制造出滚动条,并取得滚动条的宽度
		 */
		function initScrollBarWidthAndBodyTableMaxVisibleWidth(height_){
			Containers.table_body_table.width('100%');
			var _table_body_table_max_visible_width_= Containers.table_body_table.width();
			Containers.table_body_tbody.html('<tr><td>&nbsp;</td></tr>');// 必须有内容才能设置高度
			Containers.table_body_scroll_div.height(height_);
			Containers.table_body_table.height(height_ + 1);
			var _container_table_body_table_not_scroll_max_width_= Containers.table_body_table.width();

			// 清除以上设置操作
			Containers.table_body_tbody.html('');
			Containers.table_body_table.width('');
			Containers.table_body_scroll_div.height('');
			Containers.table_body_table.height('');

			Tables.scrollbar_width= _table_body_table_max_visible_width_ - _container_table_body_table_not_scroll_max_width_;
		}

		/**
		 * 添加表头内容
		 */
		function addHead(){
			Containers.table_head_tbody.empty();// 清空
			var _tr_= jQuery('<tr></tr>');

			for(var _title_index_= 0;_title_index_ < titles_.length;_title_index_++){
				var _th_;
				/*
				 * 标题不换行 <pre> word-break: keep-all; white-space: nowrap;</pre>
				 */
				// var _th_style_= 'word-break: keep-all; white-space: nowrap;'
				var _th_style_= 'border-bottom: 0px solid #6ea1be; border-right: 0px solid #6ea1be; border-top: 1px solid #6ea1be; border-left: 1px solid #6ea1be;';
				if(linkage_flag_ && _title_index_ == 0){
					continue;
				}else{
					var _text_= titles_[_title_index_];
					if(titles_[_title_index_].toLowerCase() == 'null'){// null值不显示为''
						_text_= '';
					}
					_th_= jQuery('<th align="center" style="' + _th_style_ + '">' + _text_ + '</th>');
				}
				_tr_.append(_th_);
			}
			// 多加一列做为内容滚动条的宽度
			_th_= jQuery('<th style="width: ' + Tables.scrollbar_width + 'px; background-color: #CDCDCD; border-bottom: 0px solid #6ea1be; border-right: 0px solid #6ea1be; border-top: 1px solid #6ea1be; border-left: 0px solid #6ea1be;">&nbsp;</th>');
			_tr_.append(_th_);

			Containers.table_head_tbody.append(_tr_);
		}

		/**
		 * 添加表体内容
		 */
		function addContent(){
			Containers.table_body_tbody.empty();// 清空表格数据部分
			for(var _row_index_= 0;_row_index_ < datas_.length;_row_index_++){
				var _row_datas_= datas_[_row_index_];
				var _tr_= createTr(_row_index_, _row_datas_, linkage_flag_);
				for(var _col_index_= 0;_col_index_ < titles_.length;_col_index_++){
					var _td_style_name_
					if(_col_index_ == 0 && linkage_flag_){
						continue;
					}
					var _col_data= _row_datas_[_col_index_];
					var _is_ranking_= (titles_[_col_index_].indexOf('排名') == titles_[_col_index_].length - 2) ? true : false;
					var _td_= createTd(_col_index_, _col_data, linkage_flag_, _is_ranking_);
					_tr_.append(_td_);
				}
				Containers.table_body_tbody.append(_tr_);
			}
		}

		/**
		 * 新建表格tr对象
		 * 
		 * @param _row_index_
		 *            string 行索引
		 * @param row_datas_
		 *            Array 行数据
		 * @param linkage_flag_
		 *            是否使用联动标识; true 是; flase 否;
		 */
		function createTr(_row_index_, row_datas_, linkage_flag_){
			var _tr_style_name_= '';
			var _tr_style_= '';
			var _tr_id_= '';
			var num= _row_index_ % 2;
			if(num == 0){// 偶数行样式
				_tr_style_name_= 'odd';
			}
			if(linkage_flag_ && row_datas_[0].indexOf("V") < 0 && row_datas_[0].indexOf("F") < 0){// 可联动的表格
				_tr_style_= 'cursor:pointer;';
				_tr_id_= 'id="' + row_datas_[0] + '"';
			}
			var _tr_= jQuery('<tr ' + _tr_id_ + ' class="' + _tr_style_name_ + '" style="' + _tr_style_ + '"></tr>');
			return _tr_;
		}

		/**
		 * 新建表格td对象
		 * 
		 * @param col_index_
		 *            string 列索引
		 * @param col_data_
		 *            string 列数据
		 * @param linkage_flag_
		 *            是否使用联动标识; true 是; flase 否;
		 */
		function createTd(col_index_, col_data_, linkage_flag_, is_ranking_){
			var _td_style_name_= '';
			var _td_style_= 'border-bottom: 0px solid #cccccc; border-right: 0px solid #cccccc; border-top: 1px solid #cccccc; border-left: 1px solid #cccccc;';
			if(col_index_ == 0 || (linkage_flag_ && col_index_ == 1)){// 第一列不换行
				_td_style_+= 'word-break: keep-all; white-space: nowrap; ';
			}
			var _ranking_= '';
			if(col_data_.toString().indexOf("+") != -1 || (col_data_.toString().indexOf("-") == -1 && col_data_.toString().lastIndexOf("%") == col_data_.toString().length - 1)){
				_td_style_name_= this.increase_class;
			}else if(col_data_.toString().indexOf("-") != -1){
				_td_style_name_= this.decrease_class;
			}else if(!isNaN(col_data_)){
				_td_style_name_= this.value_class;
			}else if(col_data_.toString().indexOf("+") == -1 && col_data_.toString().indexOf("-") == -1){
				if(linkage_flag_ && col_index_ == 1){
					_td_style_name_= 'strong';
				}
				col_data_= col_data_.replace(/\s+/g, '&nbsp;');// 去除敏感符
			}
			var _td_= jQuery('<td class="' + _td_style_name_ + '" style="' + _td_style_ + '"></td>');
			_td_.append(col_data_);
			if(is_ranking_){
				if(col_data_.toString().indexOf('-') == 0){
					_td_.append('&nbsp;<img style="width: 13px; height: 12px; vertical-align: middle;" src="../images/ranking_down.png" />');
				}else if(col_data_.toString().indexOf('+') == 0){
					_td_.append('&nbsp;<img style="width: 13px; height: 12px; vertical-align: middle;" src="../images/ranking_up.png" />');
				}
			}
			return _td_;
		}

		/**
		 * 重置表格显示相关控制参数
		 */
		function resetTableControlsParameter(){
			Containers.table_head_scroll_div.outerWidth('');
			Containers.table_body_scroll_div.outerHeight('');
			Containers.table_body_scroll_div.outerWidth('');
			Containers.table_head_table.outerWidth('');
			Containers.table_body_table.outerWidth('');
			var _ths_= Containers.table_head_tbody.find('> tr:eq(0) > th')
			var _tds_= Containers.table_body_tbody.find('> tr:eq(0) > td');
			jQuery.each(_tds_, function(index_, td_){
				var _td_= $(td_);
				var _th_= $(_ths_[index_]);
				_td_.outerWidth('');
				_th_.outerWidth('');
			});
			Tables.content_total_width= 0;
			Tables.column_content_widths= [];
			Tables.show_transverse_scrollber= false;
			Tables.scroll_visible_width= 0;
		}

		/**
		 * 同步列宽
		 */
		function syncColumnWidth(){// 同步表头与内容列宽度
			resetTableControlsParameter();
			var _ths_= Containers.table_head_tbody.find('> tr:eq(0) > th')
			var _tds_= Containers.table_body_tbody.find('> tr:eq(0) > td');
			initActualWidths(_ths_, _tds_);
			initDefaultWidth(_ths_, _tds_);
			var _twidth_= Math.ceil(Tables.show_transverse_scrollber ? Containers.table_body_table.width() : Tables.scroll_visible_width);// 总宽度
			Containers.table_head_table.outerWidth(_twidth_ + Tables.scrollbar_width);// 必须加上滚动条的宽度(没有滚动条的时候自动被容器div遮蔽)
			Containers.table_body_table.outerWidth(_twidth_);
			setScrollSize();
		}

		/**
		 * 取得表格实际宽度<br>
		 * 注:列宽由标题列与内容列中,宽度最大的决定该列的宽度<br>
		 * 
		 * @param ths_
		 *            array 表标题列列表
		 * @param tds_
		 *            array 表内容首列列表
		 */
		function initActualWidths(ths_, tds_){
			// 先将表格设置为:自动表格布局,取得各列(包括标题列)的最小宽度
			[Containers.table_body_table, Containers.table_head_table].map(function(ele_, index_){
				ele_.css({
					'table-layout':'auto'
				});
			});
			jQuery.each(tds_, function(index_, td_){
				var _srcTd_= $(td_);
				var _tarTh_= $(ths_[index_]);
				var _width_= Math.ceil(Math.max(_srcTd_.outerWidth(), _tarTh_.outerWidth()));// 取最大一个宽度,的最小整数的宽度
				_srcTd_.outerWidth(_width_);
				_tarTh_.outerWidth(_width_);
				Tables.column_content_widths[Tables.column_content_widths.length]= _width_;
				Tables.content_total_width+= _width_;
			});

			Tables.scroll_visible_width= getContinerVisibleWidth();
			Tables.show_transverse_scrollber= Tables.content_total_width > Tables.scroll_visible_width;

			// 最后再将表格设置为:固定表格布局,使用列宽来控制表格
			[Containers.table_body_table, Containers.table_head_table].map(function(ele_, index_){
				ele_.css({
					'table-layout':'fixed'
				});
			});
		}

		/**
		 * 初始化预设置列的宽度
		 * 
		 * @param ths_
		 *            array 表标题列列表
		 * @param tds_
		 *            array 表内容首列列表
		 */
		function initDefaultWidth(ths_, tds_){
			var _sharing_value_= 0;
			var _mod_value_= 0;
			if(!Tables.show_transverse_scrollber){
				var _subtract_value_= Tables.scroll_visible_width - Tables.content_total_width;
				_mod_value_= _subtract_value_ % Tables.column_content_widths.length;
				_sharing_value_= (_subtract_value_ - _mod_value_) / Tables.column_content_widths.length;
			}
			jQuery.each(tds_, function(index_, td_){
				var _td_= $(td_);
				var _th_= $(ths_[index_]);
				var _width_= Math.ceil(Tables.column_content_widths[index_] + _sharing_value_);
				if(_mod_value_ > 0){// 不能被整除的数时,把余数按前到后在每个列上+1值到余数等于0
					_width_+= 1;
					_mod_value_-= 1;
				}
				_td_.outerWidth(_width_);
				_th_.outerWidth(_width_);
			});
		}

		/**
		 * 取得滚动容器的可见宽度 <br>
		 * 注:如果出现纵轴的滚动条则减去滚动条的宽度
		 */
		function getContinerVisibleWidth(){
			var _table_body_scroll_div_height_= getTableBodyScrollDivVisibleHeight();
			var _container_table_body_table_height= Containers.table_body_table.height();
			if(_container_table_body_table_height > _table_body_scroll_div_height_){
				return Containers.table_body_scroll_div.innerWidth() - Tables.scrollbar_width;
			}
			return Containers.table_body_scroll_div.innerWidth();
		}
		/**
		 * 取得滚动容器的可见高度 <br>
		 * 注:删除高度标题
		 */
		function getTableBodyScrollDivVisibleHeight(){
			return Containers.main_container.innerHeight() - Containers.table_head_table.outerHeight();
		}

		/**
		 * 设置可见区域,使div内容超出时显示滚动条
		 */
		function setScrollSize(){
			var _table_body_scroll_div_height_= getTableBodyScrollDivVisibleHeight();
			var _width_= Containers.main_container.innerWidth();
			Containers.table_head_scroll_div.outerWidth(_width_);
			Containers.table_body_scroll_div.outerHeight(_table_body_scroll_div_height_);
			Containers.table_body_scroll_div.outerWidth(_width_);
		}

		/**
		 * 设置表头与表体两个div的滚动条事件同步
		 */
		function setScrollSync(){
			Containers.table_body_scroll_div.scroll(function(){
				Containers.table_head_scroll_div.scrollLeft(jQuery(this).scrollLeft());
			});
		}

		function resize(){
			syncColumnWidth();
		}

		// debugger;
		init();
		addHead();
		addContent();
		resize();
		setScrollSync();
		$(window).resize(function(ev_){
			resize();
		});
		// debugger;
	}
};