
<div className="main">
  <div className="title">{this.props.name}</div>
    {assistance.map((a, i)=>
      <Section key={a.objectId} title={a.name} onClick={this.handleClick}>

          <p>{a.content}</p>
          {a.location}<br />
          {a.event_date}


        </Section>
)}
</div>


handleClick() {
  if(this.state.open) {
    this.setState({
      open: false,
      class: "section"
    });
  } else {
    this.setState({
      open: true,
      class: "section open"
    });
  }
},
