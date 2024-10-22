import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="  pt-5 bg-dark" style={{height:"50vh"}}>
      <div className="container d-flex">
          <div className="row">
            <div className="col-md-3 col-xs-12">
            <div className="footer-logo">
                    <a href="#">
                      <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_65.png" />
                    </a>
                  </div>
                  <div className="summary ms-2">
                  Lorem ipsum dolor sit amet, consectetur adipiuat.reprehenderit in voluptate
              </div>
            </div>
            </div>
         
            <div className="col-md-3 col-xs-12">
              <div className="amy-widget amy-widget-list">
                <div className="amy-widget amy-widget-list list-post ">
                  <h4 className="amy-title amy-widget-title">Recent Posts</h4>
                  <div className="entry-item">
                    <div className="entry-thumb">
                      <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_59-115x85_c.jpg" />
                    </div>
                    <div className="entry-content">
                      <h2 className="entry-title">
                        <a href="http://demo.amytheme.com/movie/demo/elementor-single-cinema/2022/04/28/six-book-to-film-adaptations-to-get-excited-about-this-autumn/">
                         
                        </a>
                      </h2>
                      <div className="entry-meta">
                        <span className="entry-date">April 28, 2022</span>
                        <span> / </span>
                        <span className="entry-comment">0 Comments</span>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="entry-item">
                    <div className="entry-thumb">
                      <img src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_57-115x85_c.jpg" />
                    </div>
                    <div className="entry-content">
                      <h2 className="entry-title">
                       
                      </h2>
                      <div className="entry-meta">
                        <span className="entry-date">April 28, 2022</span>
                        <span> / </span>
                        <span className="entry-comment">0 Comments</span>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="col-md-3 col-xs-12">
                <div className="amy-widget amy-widget-module contact ">
                  <h4 className="amy-title amy-widget-title">Contact Us</h4>
                  <div className="address">
                    <i className="fa fa-location-arrow" aria-hidden="true"></i>
                    9067 Zurich, Switzerland 87
                  </div>
                  <div className="email">
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    abc@gmail.com
                  </div>
                  <div className="phone">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    01-234-5678
                  </div>
                </div>
            </div>
        </div>
    </footer>
  );
}
