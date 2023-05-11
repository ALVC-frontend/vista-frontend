import React from 'react';

function ArticleShow(props: { article: { title: any; publish_at: any; content: any; status: any; }; }) {
  const { title, publish_at, content, status } = props.article;

  return (
    <div>
      <h3 className="article-title">
        Title: {title || "No Title"}
      </h3>
      <div style={{fontStyle: "italic"}}>
        Date published: {publish_at?.localtime?.strftime('%A, %e %B %Y at %H:%M') || "No published Date"}
      </div>
      <hr style={{backgroundColor: "rgb(216, 194, 94)"}} />
      <p className="article-content">
        {content || "No content"}
      </p>
      <hr style={{backgroundColor: "rgb(216, 194, 94)"}} />
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <span style={{color: "red", fontWeight: "bold", display: "inline-block", padding: "5px 10px", border: "1px solid #ccc", borderRadius: "5px", textDecoration: "none"}}>
          Edit
        </span>
        <span className="pay_btn" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <i className="fa fa-credit-card" aria-hidden="true"></i>&nbsp;
          {status}
        </span>
        <span className="delete_btn" style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  );
}

export default ArticleShow;
