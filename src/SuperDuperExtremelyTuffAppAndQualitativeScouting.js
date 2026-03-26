import './App.css';

import TextBox from './widgets/TextBox';
import Submit from './widgets/Submit';
import TextBoxLong from './widgets/TextBoxLong';
import Export from './widgets/Export';

import { v4 as uuidv4 } from "uuid"
import React from 'react';
import ClearLocalStorage from './widgets/ClearLocalStorage';

import { set, ref } from "firebase/database";
import { db } from "./firebaseConfig";
import Dropdown from './widgets/Dropdown';

import { GameId, EventId } from "./GameIds";

class SuperDuperExtremelyTuffAppAndQualitativeScouting extends React.Component {
	
	counter = 0;
	
	constructor(props) {
		super(props);
		this.state = {
			selectedAlliance: localStorage.getItem('alliance'),
		};
		this.scoutingLog = [];
	}
	
	gatherData = () => {
		var arr = []
		
		for (var i = 0; i < this.scoutingLog.length; i++) {
			
			var element = document.getElementById(this.scoutingLog[i]);
			console.log(element);
			if (element !== null) {
				var value;
				if (element.getAttribute("value") !== null && element.getAttribute("value") !== undefined) {
					
					value = (element.getAttribute("value"))
					
					if (element.required && value === "") {
						
						alert("Required field " + element.getAttribute("title") + " is blank.")
						return [[], false]
						
					}
				} else {
					value = element.value
				}
				arr.push([element.getAttribute("title"), value])
			}
		}
		return [arr, true]
	}
	
	handleFormSubmit = (e) => {
		e.preventDefault()
		
		let data = this.gatherData();
		
		const sendData = data[1];
		
		
		const eventID = EventId;
		const gameID = GameId;
		const dataType = 'qualitative';
		
		if (sendData) {
			let validMatch = true;
			if (this.badMatchNumber(data[1][1])) {
				validMatch = window.confirm("Are you sure your match and team numbers are correct?");
			}
			if (validMatch) {
				for (let i = 0; i < 8; i++) {
					console.log("item " + i + " " + data[i][1] + data[i][1].id)
				}
				let name = data[0][1];
				let matchNumber = data[1][1];
				let alliance = data[2][1];
				let teamNumber = data[3][1];
				
				let commentData = {
					"Name": name,
					"Team": teamNumber,
					"Comments": data[4][1],
					"Auto Description": data[5][1],
					"Off Time": data[6][1],
					"Other Notes": data[7][1]
				}
				
				//           game           event          type of scouting           match #           Name            team
				set(ref(db, gameID + '/' + eventID + dataType + '/match-' + matchNumber + '/' + name + '|'  + data[3][1] + '/coolFreshmanCode/'), commentData);
				
				localStorage.setItem("name", name)
				localStorage.setItem("matchNumber", matchNumber)
				localStorage.setItem("alliance", alliance)
				
				let cachedData = JSON.parse(localStorage.getItem("matchData"))
				
				if (cachedData === null) {
					cachedData = {}
				}
				
				let matchPath = `match-${matchNumber}`
				let botPath = `${name}|-${data[2][1]}`
				
				if (cachedData[matchPath] === undefined) {
					cachedData[matchPath] = {};
					cachedData[matchPath][botPath] = { data: data, comments: commentData }
				} else {
					cachedData[matchPath][botPath] = { data: data, comments: commentData }
				}
				
				cachedData = JSON.stringify(cachedData, null, "\t")
				
				localStorage.setItem("matchData", cachedData)
				
				window.scrollTo(0, 0)
				setTimeout(() => {
					document.location.reload()
				}, 3500)
				alert("Data submitted, press ok to continue")
			}
		}
	}
	
	badMatchNumber = (val) => {
		return (val.toString().length > 2 || parseInt(val) < 0)
	}
	
	clearLocalStorage = () => {
		var response = window.confirm("Are you sure you want to clear all saved matches?");
		if (!response) { alert("Aborted wiping local storage"); return; }
		response = window.confirm("Are you sure you're sure?");
		if (!response) { alert("Aborted wiping local storage"); return; }
		localStorage.clear();
		alert("Cleared all match data.")
	}
	
	assignUUID = () => {
		var id = uuidv4();
		this.scoutingLog.push(id);
		return id;
	}
	
	handleExportData = (_) => {
		let cachedDataJSON = localStorage.getItem("matchData");
		
		if (cachedDataJSON != null) {
			let file = new Blob([cachedDataJSON], { type: "text/json" })
			
			let blobURL = window.URL.createObjectURL(file)
			
			const anchor = document.createElement('a');
			anchor.href = blobURL
			anchor.target = "_blank"
			anchor.download = "matchData.json"
			
			anchor.click()
			
			URL.revokeObjectURL(blobURL);
		}
	}
	
	checkAlliance = () => {
		if (this.state.selectedAlliance === "BLUE") {
			document.querySelector(':root').style.setProperty('--team-color','blue')
			document.querySelector(':root').style.setProperty('--team-active-color','navy')
		} else if (this.state.selectedAlliance === "RED") {
			document.querySelector(':root').style.setProperty('--team-color','red')
			document.querySelector(':root').style.setProperty('--team-active-color','maroon')
		}
	}
	
	handleAllianceChange = (alliance) => {
		this.setState({
			selectedAlliance: {alliance}
		})
		console.log("Alliance: " + alliance)
		console.log("What Site Be Thinking: " + this.state.selectedAlliance)
	}
	
	render() {
		this.checkAlliance()
		return (
			<ul className="container">
	        <span className="label cookie">
	          By Continuing to Use Our Website You Agree to Use Cookies :)
	        </span>
				<a className="qualitativeScouting" href="/"><p>Regular Scouting</p></a>
				<a
					className="scouting-guidelines"
					href="https://docs.google.com/document/d/1OiVVfB9Mx3mIwIE4ahyO1Sa65VuAJsUcy7czSVyzZJ4/edit?usp=sharing"
					target="_blank"
					rel="noreferrer"
				>
					Scouting Guidelines
				</a>
				<h1 className="title">
					PATRIBOTS SCOUTING
				</h1>
				<div className='identification-container'>
					<h2 className="subtitle section-title">
						IDENTIFICATION
					</h2>
					<div>
						<TextBox
							className="textbox name"
							id={this.assignUUID()}
							title={"Name"}
							value={localStorage.getItem("name")}
							required={"true"}
							numeric={false}
						/>
						<TextBox
							className="textbox match"
							id={this.assignUUID()}
							title="Match Number"
							value={+localStorage.getItem("matchNumber") + 1}
							required={true}
							numeric={true}
						/>
					</div>
					<div>
						<Dropdown
							className="dropdown alliance"
							id={this.assignUUID()}
							title="Alliance"
							value={this.state.selectedAlliance}
							items={[
								{id:1, value: "RED", title: "Red"},
								{id:2, value: "BLUE", title: "Blue"}
							]}
							selected={this.handleAllianceChange}
						/>
						<TextBox
							className="textbox team"
							id={this.assignUUID()}
							title="Team Number"
							value={""}
							required={true}
							numeric={true}
						/>
					</div>
				</div>
				
				<div className="auto-container">
					<h2 className="subtitle section-title">
						AUTO
					</h2>
					<div className="auto-notes-box">
						<TextBoxLong
							className="text-box-long"
							id={this.assignUUID()}
							title="Auto Notes"
							value={""}
							numeric={false}
							placeholder="Describe any abnormalities in the auto, anything that would not have been included in the auto path, and if their climb failed or where they ended. "
						/>
					</div>
				</div>
				<div className="teleop-container">
					<h2 className="subtitle section-title">
						TELEOP
					</h2>
					<TextBoxLong
						className="text-box-long"
						id={this.assignUUID()}
						title={"Comments"}
						value={""}
						numeric={false}
						placeholder="Note down anything interesting about the robot or it's capabilities during any point in TeleOp."
					/>
				</div>
				<div className="post-match-container">
					<h2 className="subtitle section-title">
						POST-MATCH
					</h2>
					<div>
						<TextBoxLong
							className="text-box-long"
							id={this.assignUUID()}
							title={"Comments"}
							value={""}
							numeric={false}
							placeholder="Include anything abnormal that could have influenced the match, their driving and defense capabilities, and things they did well and not so well."
						/>
					</div>
				</div>
				<div className="extra-container">
					<h2 className="subtitle section-title">
						EXTRA NOTES
					</h2>
					<div className="extra-boxes" id="extra-boxes">
						<button type="button" onClick={this.addBox} className="add-notes-button">+ Add Notes</button>
						<button type="button" onClick={this.removeBox} className="remove-notes-button">- Remove Notes</button>
					</div>
				</div>
				<a
					className="suggestions"
					href="https://docs.google.com/forms/d/e/1FAIpQLScuS7hTiPxkxvk8t2dImAYtfXdHkqCzennD2szbqtXMaAw5zg/viewform?usp=header"
					target="_blank"
					rel="noreferrer"
				>
					Suggestions or Bugs
				</a>
				<div className='submit-container'>
					<Submit title="Submit" handleFormSubmit={this.handleFormSubmit} />
				</div>
				
				<div className='export-container'>
					<Export title="Export Data" handleExportData={this.handleExportData} />
					<ClearLocalStorage title="Clear local data" clearLocalStorage={this.clearLocalStorage} />
				</div>
			</ul>
		);
	}
	
	addBox = () => {
		const container = document.getElementById('extra-boxes');
		if (!container) {
			return;
		}

		const extraId = 'extra-text-box-' + this.counter;
		const newTextBox = document.createElement('textarea');
		newTextBox.id = extraId;
		newTextBox.className = 'text-box-long';
		newTextBox.setAttribute('title', 'Extra Notes');
		newTextBox.setAttribute('placeholder', 'Include any extra notes you have about the robot that do not fit in the other categories.');

		container.appendChild(newTextBox);
		this.scoutingLog.push(extraId);
		this.counter += 1;
	}

	removeBox = () => {
		if (this.counter <= 0) {
			return;
		}

		const targetId = 'extra-text-box-' + (this.counter - 1);
		const textBox = document.getElementById(targetId);
		if (textBox) {
			textBox.remove();
		}

		this.scoutingLog = this.scoutingLog.filter((id) => id !== targetId);
		this.counter -= 1;
	}
}
export default SuperDuperExtremelyTuffAppAndQualitativeScouting;