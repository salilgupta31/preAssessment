function openCity(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        }
    }
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

    //Create line chart with sample data
    var data = [{
            "sale": "30",
            "year": "0"
        }, {
            "sale": "300",
            "year": "1"
        }, {
            "sale": "100",
            "year": "2"
        }, {
            "sale": "400",
            "year": "3"
        }, {
            "sale": "150",
            "year": "4"
        }, {
            "sale": "250",
            "year": "5"
        }];
    var data1 = [{
            "sale": "50",
            "year": "0"
        }, {
            "sale": "20",
            "year": "1"
        }, {
            "sale": "10",
            "year": "2"
        }, {
            "sale": "40",
            "year": "3"
        }, {
            "sale": "15",
            "year": "4"
        }, {
            "sale": "25",
            "year": "5"
        }];

    var vis = d3.select("#visualisation"),
        WIDTH = 1000,
        HEIGHT = 250,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
    },
    xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,5]),
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,400]),
    xAxis = d3.svg.axis()
        .scale(xScale),
      
    yAxis = d3.svg.axis()
    .scale(yScale);

    
    vis.append("svg:g")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

    vis.append("svg:g")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

    var lineGen = d3.svg.line()
      .x(function(d) {
        return xScale(d.year);
      })
      .y(function(d) {
        return yScale(d.sale);
      });

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<span style='color:white'>Sample Data</span>";
      })

    vis.call(tip);

    vis.append('svg:path')
          .attr('d', lineGen(data))
          .attr('stroke', 'green')
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

    vis.append('svg:path')
          .attr('d', lineGen(data1))
          .attr('stroke', 'blue')
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);