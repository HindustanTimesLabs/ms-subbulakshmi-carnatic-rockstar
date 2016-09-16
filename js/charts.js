$(document).ready(function(){

  // some random functions for formatting and placing numbers
  function yearLabel(year){
    var win = $(window).width();
    if (year == '2012'){
      if (win<992){
        year = "'12";
      } else {
        year = year;
      }
    } else if (year == '2013'){
      if (win<992){
        year = "'13";
      } else {
        year = year;
      }
    } else if (year == '2014'){
      if (win<992){
        year = "'14";
      } else {
        year = year;
      }
    } else if (year == '2015'){
      if (win<992){
        year = "'15";
      } else {
        year = year;
      }
    } else if (year == '2016'){
      if (win<992){
        year = "'16";
      } else {
        year = year;
      }
    }
    return year;
  }

  function betweenBar(x){
    if (x<420){
      return 1;
    } else {
      return 2;
    }
  }

  function format(x){
    var type = typeof(x);
    if (type == 'number') {
      x = x.toString();
    } else if (type == 'string'){
      x = x.replace(/,/g, '');
    }

    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return res;
  }

  // size of chart
  var margin = {top: 13, right: 40, bottom: 30, left: 50},
  width = $('.chart').width() - margin.left - margin.right,
  height = $('.chart').height() - margin.top - margin.bottom;

  // x scales
  var x2012 = d3.time.scale()
    .range([0, width]);
  var x2013 = d3.time.scale()
    .range([0, width]);
  var x2014 = d3.time.scale()
    .range([0, width]);
  var x2015 = d3.time.scale()
    .range([0, width]);
  var x2016 = d3.time.scale()
    .range([0, width]);

  // y scale
  var y = d3.scale.linear()
    .range([height, 0]);

  // x axes
  var xAxis2012 = d3.svg.axis()
    .scale(x2012)
    .orient("bottom")
    .ticks(d3.time.months);
  var xAxis2013 = d3.svg.axis()
    .scale(x2013)
    .orient("bottom")
    .ticks(d3.time.months);
  var xAxis2014 = d3.svg.axis()
    .scale(x2014)
    .orient("bottom")
    .ticks(d3.time.months);
  var xAxis2015 = d3.svg.axis()
    .scale(x2015)
    .orient("bottom")
    .ticks(d3.time.months);
  var xAxis2016 = d3.svg.axis()
    .scale(x2016)
    .orient("bottom")
    .ticks(d3.time.months);

  // y axes
  var yAxis2012 = d3.svg.axis()
    .scale(y)
    .orient("left");
  var yAxis2013 = d3.svg.axis()
    .scale(y)
    .orient("left");
  var yAxis2014 = d3.svg.axis()
    .scale(y)
    .orient("left");
  var yAxis2015 = d3.svg.axis()
    .scale(y)
    .orient("left");
  var yAxis2016 = d3.svg.axis()
    .scale(y)
    .orient("left");

  // year vars
  var svg2012 = d3.select("#chart_2012").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("id","g-2012")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg2013 = d3.select("#chart_2013").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("id","g-2013")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg2014 = d3.select("#chart_2014").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("id","g-2014")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg2015 = d3.select("#chart_2015").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("id","g-2015")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg2016 = d3.select("#chart_2016").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("id","g-2016")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  function drawChart(category, repeat){

    // certain variables change depending upon the category
    function extras(x){
      var obj = {}
      if (x=='villages') {
        obj.metric = 'villages affected';
        obj.metricSingular = 'village affected';
        obj.ySize = '.8em';
      } else if (x=='people') {
        obj.metric = 'people affected';
        obj.metricSingular = 'person affected';
        obj.ySize = '.5em';
      } else if (x=='campsPeople') {
        obj.metric = 'people in relief camps';
        obj.metricSingular = 'person in relief camps';
        obj.ySize = '.6em';
      } else if (x=='deceased') {
        obj.metric = 'people killed';
        obj.metricSingular = 'person killed';
        obj.ySize = '.8em';
      } else if (x=='cropArea') {
        obj.metric = 'hectares affected';
        obj.metricSingular = 'hectare affected';
        obj.ySize = '.6em';
      }
      return obj;
    }

    // extra variables
    var extras = extras(category);

    // tip variable
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        var metricShow;
        if (d[category] == 1) {
          metricShow = extras.metricSingular;
        } else {
          metricShow = extras.metric
        }
        return "<strong>"+ d.dateString +"</strong><br /><br /><span style='color:#2980b9;font-weight:900'>" + format(d[category]) + "</span> "+metricShow;
      });

    // call tips
    svg2012.call(tip);
    svg2013.call(tip);
    svg2014.call(tip);
    svg2015.call(tip);
    svg2016.call(tip);

    d3.csv("data/flooddata_julyStart.csv", type, function(error, data) {

      // datasets
      var data2012 = [], data2013 = [], data2014 = [], data2015 = [], data2016 = [];

      // populate the datasets
      data.forEach(function(object,iterator){

        if (object.year=='2012'){
          data2012.push(object);
        } else if (object.year=='2013'){
          data2013.push(object);
        } else if (object.year=='2014'){
          data2014.push(object);
        } else if (object.year=='2015'){
          data2015.push(object);
        } else if (object.year=='2016'){
          data2016.push(object);
        }
      });

      y.domain([0, d3.max(data, function(d) { return d[category]; })]);

      /*
      * 2012
      */
      yAxis2012.tickValues([0,d3.max(data2012, function(d){ return d[category];})]);

      x2012.domain([new Date('July 1, 2012'), new Date('October 1, 2012')]);

      svg2012.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis2012);

      $('#chart_2012 .y.axis').remove();
      $('#chart-year-2012').remove();

      svg2012.append("g")
          .attr("class", "y axis")
          .call(yAxis2012)
        .append("text")
          .attr('class','chart-year')
          .attr('id','chart-year-2012')
          .attr("y", height+9)
          .attr("dy", ".71em")
          .attr("x", 3)
          .style("text-anchor", "start")
          .style('stroke-width',1)
          .text(yearLabel("2012"));

      var yFormat2012 = format($('#chart_2012 .y.axis .tick:nth-of-type(2) text').html());
      $('#chart_2012 .y.axis .tick:nth-of-type(2) text').html(yFormat2012);

      var barArea2012 = svg2012.selectAll(".bar-area")
          .data(data2012);

      barArea2012.enter().append("rect")
          .attr("class","bar-area")
          .attr("area-id",function(d,i) { return '2012'+i});

      barArea2012.exit()
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2012'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2012'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('height',0)
          .remove();

      barArea2012
        .attr("x", function(d) { return x2012(d.date); })
        .attr("width", function (d){
          return (width/data2012.length)+1;
        })
        .attr("y", 0)
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2012'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2012'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("height", height);

      var bar2012 = svg2012.selectAll(".bar")
          .data(data2012)

      bar2012.enter().append("rect")
          .attr("class", function(d,i) { return "bar barId2012"+i; })
          .attr("x", function(d) { return x2012(d.date); })
          .attr("width", function (d){
            return (width/data2012.length)-betweenBar($(window).width());
          });

      bar2012.exit()
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('y',0)
          .attr('height',0)
          .remove();

      bar2012
        .on('mouseover', function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var extra = height - $(this).attr('height');
          var y = coords[1];
          var currTop = $(this).offset().top-80-extra;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2012'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2012'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("y", function(d) {
            return y(d[category]);
          })
          .attr("height", function(d) { return height - y(d[category]); })

      var max2012 = d3.max(data2012,function(d){
        return d[category];
      });

      $('#chart_2012 .bar-text').remove();

      setTimeout(function(){
        var barText2012 = svg2012.selectAll('.bar-text')
            .data(data2012)
          .enter().append('text')
            .attr('text-anchor','middle')
            .attr('class',function(d){if (d[category]== max2012){return 'bar-text text-max'} else {return 'bar-text'}})
            .attr('y',function(d){
              return y(d[category])-2;
            })
            .attr('x',function(d){
              var xDate = x2012(d.date);
              if (xDate < 30){
                return 30;
              } else {
                return x2012(d.date);
              }
            })
            .text(function(d){
              if (d[category] == max2012 && d.dateStringShort!='Sep. 28' && d.dateStringShort != 'Sep. 29'){
                return 'High: '+d.dateStringShort+'';
              } else {
                return '';
              }
            });
      },300);


      $('#g-2012').append($('text#chart-year-2012'));

      /*
      * 2013
      */
      yAxis2013.tickValues([0,d3.max(data2013, function(d){ return d[category]})]);

      x2013.domain([new Date('July 1, 2013'), new Date('October 1, 2013')]);

      svg2013.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis2013);

      $('#chart_2013 .y.axis').remove();
      $('#chart-year-2013').remove();

      svg2013.append("g")
          .attr("class", "y axis")
          .call(yAxis2013)
        .append("text")
          .attr('class','chart-year')
          .attr('id','chart-year-2013')
          .attr("y", height+9)
          .attr("dy", ".71em")
          .attr("x", 3)
          .style("text-anchor", "start")
          .text(yearLabel("2013"));

      var yFormat2013 = format($('#chart_2013 .y.axis .tick:nth-of-type(2) text').html());
      $('#chart_2013 .y.axis .tick:nth-of-type(2) text').html(yFormat2013);

      var barArea2013 = svg2013.selectAll(".bar-area")
          .data(data2013);

      barArea2013.enter().append("rect")
          .attr("class","bar-area")
          .attr("area-id",function(d,i) { return '2013'+i});

      barArea2013.exit()
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2013'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2013'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('height',0)
          .remove();

      barArea2013
        .attr("x", function(d) { return x2013(d.date); })
        .attr("width", function (d){
          return (width/data2013.length)+1;
        })
        .attr("y", 0)
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2013'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2013'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("height", height);

      var bar2013 = svg2013.selectAll(".bar")
          .data(data2013)

      bar2013.enter().append("rect")
          .attr("class", function(d,i) { return "bar barId2013"+i; })
          .attr("x", function(d) { return x2013(d.date); })
          .attr("width", function (d){
            return (width/data2013.length)-betweenBar($(window).width());
          });

      bar2013.exit()
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('y',0)
          .attr('height',0)
          .remove();

      bar2013
        .on('mouseover', function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var extra = height - $(this).attr('height');
          var y = coords[1];
          var currTop = $(this).offset().top-80-extra;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2013'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2013'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("y", function(d) {
            return y(d[category]);
          })
          .attr("height", function(d) { return height - y(d[category]); })

      var max2013 = d3.max(data2013,function(d){
        return d[category];
      });

      $('#chart_2013 .bar-text').remove();

      setTimeout(function(){
        var barText2013 = svg2013.selectAll('.bar-text')
            .data(data2013)
          .enter().append('text')
            .attr('text-anchor','middle')
            .attr('class',function(d){if (d[category]== max2013){return 'bar-text text-max'} else {return 'bar-text'}})
            .attr('y',function(d){
              return y(d[category])-2;
            })
            .attr('x',function(d){
              var xDate = x2013(d.date);
              if (xDate < 30){
                return 30;
              } else {
                return x2013(d.date);
              }
            })
            .text(function(d){
              if (d[category] == max2013){
                return 'High: '+d.dateStringShort+'';
              } else {
                return '';
              }
            });
      }, 300);

      $('#g-2013').append($('text#chart-year-2013'));

      /*
      * 2014
      */
      yAxis2014.tickValues([0,d3.max(data2014, function(d){ return d[category]})]);

      x2014.domain([new Date('July 1, 2014'), new Date('October 1, 2014')]);

      svg2014.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis2014);

      $('#chart_2014 .y.axis').remove();
      $('#chart-year-2014').remove();

      svg2014.append("g")
          .attr("class", "y axis")
          .call(yAxis2014)
        .append("text")
          .attr('class','chart-year')
          .attr('id','chart-year-2014')
          .attr("y", height+9)
          .attr("dy", ".71em")
          .attr("x", 3)
          .style("text-anchor", "start")
          .text(yearLabel("2014"));

      var yFormat2014 = format($('#chart_2014 .y.axis .tick:nth-of-type(2) text').html());
      $('#chart_2014 .y.axis .tick:nth-of-type(2) text').html(yFormat2014);

      var barArea2014 = svg2014.selectAll(".bar-area")
          .data(data2014);

      barArea2014.enter().append("rect")
          .attr("class","bar-area")
          .attr("area-id",function(d,i) { return '2014'+i});

      barArea2014.exit()
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2014'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2014'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('height',0)
          .remove();

      barArea2014
        .attr("x", function(d) { return x2014(d.date); })
        .attr("width", function (d){
          return (width/data2014.length)+1;
        })
        .attr("y", 0)
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2014'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2014'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("height", height);

      var bar2014 = svg2014.selectAll(".bar")
          .data(data2014)

      bar2014.enter().append("rect")
          .attr("class", function(d,i) { return "bar barId2014"+i; })
          .attr("x", function(d) { return x2014(d.date); })
          .attr("width", function (d){
            return (width/data2014.length)-betweenBar($(window).width());
          });

      bar2014.exit()
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('y',0)
          .attr('height',0)
          .remove();

      bar2014
        .on('mouseover', function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var extra = height - $(this).attr('height');
          var y = coords[1];
          var currTop = $(this).offset().top-80-extra;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2014'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2014'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("y", function(d) {
            return y(d[category]);
          })
          .attr("height", function(d) { return height - y(d[category]); })

      var max2014 = d3.max(data2014,function(d){
        return d[category];
      });

      $('#chart_2014 .bar-text').remove();

      setTimeout(function(){
        var barText2014 = svg2014.selectAll('.bar-text')
            .data(data2014)
          .enter().append('text')
            .attr('text-anchor','middle')
            .attr('class',function(d){if (d[category]== max2014){return 'bar-text text-max'} else {return 'bar-text'}})
            .attr('y',function(d){
              return y(d[category])-2;
            })
            .attr('x',function(d){
              var xDate = x2014(d.date);
              if (xDate < 30){
                return 30;
              } else {
                return x2014(d.date);
              }
            })
            .text(function(d){
              if (d[category] == max2014){
                return 'High: '+d.dateStringShort+'';
              } else {
                return '';
              }
            });
      }, 300);

      $('#g-2014').append($('text#chart-year-2014'));

      /*
      * 2015
      */
      yAxis2015.tickValues([0,d3.max(data2015, function(d){ return d[category]})]);

      x2015.domain([new Date('July 1, 2015'), new Date('October 1, 2015')]);

      svg2015.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis2015);

      $('#chart_2015 .y.axis').remove();
      $('#chart-year-2015').remove();

      svg2015.append("g")
          .attr("class", "y axis")
          .call(yAxis2015)
        .append("text")
          .attr('class','chart-year')
          .attr('id','chart-year-2015')
          .attr("y", height+9)
          .attr("dy", ".71em")
          .attr("x", 3)
          .style("text-anchor", "start")
          .text(yearLabel("2015"));

      var yFormat2015 = format($('#chart_2015 .y.axis .tick:nth-of-type(2) text').html());
      $('#chart_2015 .y.axis .tick:nth-of-type(2) text').html(yFormat2015);

      var barArea2015 = svg2015.selectAll(".bar-area")
          .data(data2015);

      barArea2015.enter().append("rect")
          .attr("class","bar-area")
          .attr("area-id",function(d,i) { return '2015'+i});

      barArea2015.exit()
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2015'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2015'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('height',0)
          .remove();

      barArea2015
        .attr("x", function(d) { return x2015(d.date); })
        .attr("width", function (d){
          return (width/data2015.length)+1;
        })
        .attr("y", 0)
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2015'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2015'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("height", height);

      var bar2015 = svg2015.selectAll(".bar")
          .data(data2015)

      bar2015.enter().append("rect")
          .attr("class", function(d,i) { return "bar barId2015"+i; })
          .attr("x", function(d) { return x2015(d.date); })
          .attr("width", function (d){
            return (width/data2015.length)-betweenBar($(window).width());
          });

      bar2015.exit()
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('y',0)
          .attr('height',0)
          .remove();

      bar2015
        .on('mouseover', function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var extra = height - $(this).attr('height');
          var y = coords[1];
          var currTop = $(this).offset().top-80-extra;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2015'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2015'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("y", function(d) {
            return y(d[category]);
          })
          .attr("height", function(d) { return height - y(d[category]); })

      var max2015 = d3.max(data2015,function(d){
        return d[category];
      });

      $('#chart_2015 .bar-text').remove();

      setTimeout(function(){
        var barText2015 = svg2015.selectAll('.bar-text')
            .data(data2015)
          .enter().append('text')
            .attr('text-anchor','middle')
            .attr('class',function(d){if (d[category]== max2015){return 'bar-text text-max'} else {return 'bar-text'}})
            .attr('y',function(d){
              return y(d[category])-2;
            })
            .attr('x',function(d){
              var xDate = x2015(d.date);
              if (xDate < 30){
                return 30;
              } else {
                return x2015(d.date);
              }
            })
            .text(function(d){
              if (d[category] == max2015 && d.dateStringShort != 'Sep. 4'){
                return 'High: '+d.dateStringShort+'';
              } else {
                return '';
              }
            });
      }, 300);

      $('#g-2015').append($('text#chart-year-2015'));

      /*
      * 2016
      */
      yAxis2016.tickValues([0,d3.max(data2016, function(d){ return d[category]})]);

      x2016.domain([new Date('July 1, 2016'), new Date('October 1, 2016')]);
      $('.x.axis .tick text').remove();
      svg2016.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis2016);

      $('#chart_2016 .y.axis').remove();
      $('#chart-year-2016').remove();

      svg2016.append("g")
          .attr("class", "y axis")
          .call(yAxis2016)
        .append("text")
          .attr('class','chart-year')
          .attr('id','chart-year-2016')
          .attr("y", height+9)
          .attr("dy", ".71em")
          .attr("x", 3)
          .style("text-anchor", "start")
          .text(yearLabel("2016"));

      var yFormat2016 = format($('#chart_2016 .y.axis .tick:nth-of-type(2) text').html());
      $('#chart_2016 .y.axis .tick:nth-of-type(2) text').html(yFormat2016);

      var barArea2016 = svg2016.selectAll(".bar-area")
          .data(data2016);

      barArea2016.enter().append("rect")
          .attr("class","bar-area")
          .attr("area-id",function(d,i) { return '2016'+i});

      barArea2016.exit()
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2016'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2016'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('height',0)
          .remove();

      barArea2016
        .attr("x", function(d) { return x2016(d.date); })
        .attr("width", function (d){
          return (width/data2016.length)+1;
        })
        .attr("y", 0)
        .on("mouseover", function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var y = coords[1];
          var currTop = $(this).offset().top-80;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2016'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2016'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("height", height);

      var bar2016 = svg2016.selectAll(".bar")
          .data(data2016)

      bar2016.enter().append("rect")
          .attr("class", function(d,i) { return "bar barId2016"+i; })
          .attr("x", function(d) { return x2016(d.date); })
          .attr("width", function (d){
            return (width/data2016.length)-betweenBar($(window).width());
          });

      bar2016.exit()
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr('y',0)
          .attr('height',0)
          .remove();

      bar2016
        .on('mouseover', function(d,i){
          tip.show(d);
          var coords = [0,0];
          coords = d3.mouse(this);
          var extra = height - $(this).attr('height');
          var y = coords[1];
          var currTop = $(this).offset().top-80-extra;
          $('.d3-tip').css('top',currTop+y-3);
          $('.barId2016'+i).css('fill','#2c3e50');
        })
        .on('mouseout', function(d,i){
          tip.hide(d);
          $('.barId2016'+i).css('fill','#2980b9');
        })
        .transition()
        .duration(300)
        .ease('quad-out')
          .attr("y", function(d) {
            return y(d[category]);
          })
          .attr("height", function(d) { return height - y(d[category]); })

      var max2016 = d3.max(data2016,function(d){
        return d[category];
      });

      $('#chart_2016 .bar-text').remove();

      setTimeout(function(){
        var barText2016 = svg2016.selectAll('.bar-text')
            .data(data2016)
          .enter().append('text')
            .attr('text-anchor','middle')
            .attr('class',function(d){if (d[category]== max2016){return 'bar-text text-max'} else {return 'bar-text'}})
            .attr('y',function(d){
              return y(d[category])-2;
            })
            .attr('x',function(d){
              var xDate = x2016(d.date);
              if (xDate < 30){
                return 30;
              } else {
                return x2016(d.date);
              }
            })
            .text(function(d){
              if (d[category] == max2016){
                return 'High: '+d.dateStringShort+'';
              } else {
                return '';
              }
            });
      }, 300);

      $('#g-2016').append($('text#chart-year-2016'));

      // update x axis label location
      $('.x.axis .tick text').attr('x',$('.chart').width()/6 - 13)

      // y axis font size
      $('.y.axis').css('font-size',extras.ySize);

      // have to do this because of an apparent bug where the y-axis path does not display
      // until the chart changes
      if (repeat == 'first'){
        $('.y.axis path').css('stroke-width',1.01);
      } else {
        $('.y.axis path').css('stroke-width',1)
      }

    });

  }

  drawChart('villages','first');

  $('select').change(function(){
    drawChart($(this).val(),'notfirst');
  });

  // convert data types
  function type(d) {
    d.cropArea = +d.cropArea;
    d.camps = +d.camps;
    d.campsPeople = +d.campsPeople;
    d.villages = +d.villages;
    d.deceased = +d.deceased;
    d.districts = +d.districts;
    d.people = +d.people;
    d.dateMoment = moment(d.date);
    d.date = d.dateMoment._d;
    d.dateString = d.month+' '+d.day+', '+d.year;
    d.dateStringShort = d.dateMoment.format('MMM. D')
    return d;
  }
});
