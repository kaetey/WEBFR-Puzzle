import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Tile{
  id: string,
  src: string,
  alt: string
  style: {opacity: string}
}

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {
  gameTitle = "FHTW PUZZLE GAME";
  currUrl = this.router.url;
  puzzle = this.currUrl.charAt(this.currUrl.length-1);
  tiles:Tile[] = [];

  constructor(private router: Router,) { }

  ngOnInit(): void {
    //shuffle the parts
    const puzzlePartsIdx = this.shufflePuzzleParts();

    //add pictures for random puzzle
    for (let i = 0; i < puzzlePartsIdx.length; i++) {
      this.tiles.push({
        id: "part" + puzzlePartsIdx[i], 
        src: "../assets/puzzle"+this.puzzle+"_imgs/img"+puzzlePartsIdx[i]+".jpg", 
        alt: "part" + puzzlePartsIdx[i],
        style: {opacity: "1.0"}
      });
    }
  }

  chooseTile(id: string){
    const currentTile:Tile = this.getTile(id);
    if (!this.isSolved()) {
      if (this.isSelectable()) {
        
        const firstSelectedPuzzlePartId = this.getAlreadySelectedTileId();

        //set opacity for clicked element
        if (currentTile.style.opacity != "0.6") {
          currentTile.style.opacity = "0.6";
        }

        //swap parts, when more than 1 part is selected
        if (this.countSelected() > 1) {
          if (this.areNeighbours(firstSelectedPuzzlePartId, id)) {
            this.swapTiles();
          }
          this.resetOpacity();
        }
      }
    }
  }

  getTile(id: string): Tile{
    for(let i = 0; i < this.tiles.length; i++){
      if(this.tiles[i].id == id){
        return this.tiles[i];
      }
    }
  }

  shufflePuzzleParts() {
    const puzzleParts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let counter = puzzleParts.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = puzzleParts[counter];
      puzzleParts[counter] = puzzleParts[index];
      puzzleParts[index] = temp;
    }
    return puzzleParts;
  }

  isSelectable() {
    return this.countSelected() <= 1;
  }

  countSelected() {
    let counter = 0;
    
    // count selected elements
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].style.opacity == "0.6") {
        counter++;
      }
    }
    
    return counter;
  }
  
  getAlreadySelectedTileId() {
    let counter = 0;
    
    // find selected element
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].style.opacity == "0.6") {
        return this.tiles[i].id!;
      }
    }
    
    return "";
  }
  
  isSolved() {
    
    //check if the parts are sorted
    for (let i = 0; i < this.tiles.length; i++) {
      const tile = "part" + (i + 1).toString();
      const imgElement = this.tiles[i].id;
      
      if (tile != imgElement) {
        return false;
      }
    }
    
    return true;
  }
  
  areNeighbours(firstTileId: string, secondTileId: string) {
    
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].id == firstTileId) {
        const neighbourIdxs = this.getNeighbourIdxs(i);
        for (let j = 0; j < neighbourIdxs.length; j++) {
          if (this.tiles[neighbourIdxs[j]].id == secondTileId) {
            return true;
          }
        }
      }
    }
    return false;
  }
  
  swapTiles() {
    let tile1 = null;
    
    // loop through tiles
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].style.opacity == "0.6") {
        if (tile1 == null) {
          tile1 = this.tiles[i]!;
          continue;
        }
        
        let tile2 = this.tiles[i]!;
        
        //swap pictures (swap their properties)
        const tile1Source = tile1.src!;
        const tile1Alt = tile1.alt!;
        const tile1Id = tile1.id!;
  
        const tile2Source = tile2.src!;
        const tile2Alt = tile2.alt!;
        const tile2Id = tile2.id!;
   
        tile1.src = tile2Source;
        tile1.alt = tile2Alt;
        tile1.id = tile2Id;
  
        tile2.src = tile1Source;
        tile2.alt = tile1Alt;
        tile2.id = tile1Id;
        
        if (this.isSolved()) {
          /*let solved = document.createElement("div");
          solved.id = "solved";
          
          const linkText = document.createTextNode("SOLVED :)");
          solved.appendChild(linkText);
          riddle.appendChild(solved); */
        }
        
        break;
      }
    }
  }
  
  resetOpacity() {
  
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].style.opacity == "0.6") {
        this.tiles[i].style.opacity = "1.0";
      }
    }
  }
  
  getNeighbourIdxs(currentIdx: number) {
    const returnIdxs: number[] = [];
  
    // upperNeighbourIdx
    if (this.isNeighbourIndexCol(currentIdx - 3)) {
      returnIdxs.push(currentIdx - 3);
    }
    // rightNeighbourIdx
    if (this.isNeighbourIndexRow(currentIdx, currentIdx + 1)) {
      returnIdxs.push(currentIdx + 1);
    }
    // lowerNeighbourIdx
    if (this.isNeighbourIndexCol(currentIdx + 3)) {
      returnIdxs.push(currentIdx + 3);
    }
    // leftNeighbourIdx
    if (this.isNeighbourIndexRow(currentIdx, currentIdx - 1)) {
      returnIdxs.push(currentIdx - 1);
    }
    
    return returnIdxs;
  }
  
  isNeighbourIndexRow(currentIdx: number, checkIdx: number) {
    return (Math.max(-1, checkIdx) > -1) &&
      (Math.min(9, checkIdx) < 9) &&
      (Math.floor(currentIdx / 3) == Math.floor(checkIdx / 3));
  }
  
  isNeighbourIndexCol(checkIdx: number) {
    return (Math.max(-1, checkIdx) > -1) &&
      (Math.min(9, checkIdx) < 9);
  }

  convertString(id: string): string{
    for(let i = 0; this.tiles.length; i++){
      if(id == this.tiles[i].id){
        let opacity = this.tiles[i].style.opacity;
        return "opacity:"+opacity+";";
      }
    }
  }
}