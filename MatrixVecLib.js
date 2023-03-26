class Matrix {
    constructor(m = [[0]]) {
        this.value = m;
        this.width = m[0].length;
        this.height = m.length;
        this.cWidth = [];
        this.calc_c_widths();
    }
    
    //DONE
    calc_c_widths() {
        this.cWidth = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let wid = this.value[y][x].toString().length;
                if (x>=this.cWidth.length) {
                    this.cWidth[x] = wid;
                    continue;
                }
                if (wid>this.cWidth[x]) {
                    this.cWidth[x] = wid;
                }
            }
        }
    }
    
    calc_dim () {
        this.width = this.value[0].length;
        this.height = this.value.length;
    }
    
    //DONE
    toString() {
        let out = "";
        for (let i = 0; i < this.height; i++) {
            if (i == 0 && i == this.height -1) {
                out=out+"[ ";
            } else if (i == 0) {
                out=out+"\u23A1 ";
            } else if (i == this.height-1) {
                out=out+"\u23A3 ";
            } else {
                out=out+"\u23A2 ";
            }
            for (let j = 0; j < this.width; j++) {
                let subOut = this.value[i][j].toString();
                while (subOut.length < this.cWidth[j]) {
                    subOut = " " + subOut;
                }
                out = out + subOut + " ";
            }
            if (i == 0 && i == this.height-1) {
                out = out + "] ";
            } else if (i == 0) {
                out=out+"\u23A4 ";
            } else if (i == this.height-1) {
                out=out+"\u23A6 ";
            } else {
                out=out+"\u23A5 ";
            }
            out = out + "\n";
        }
        return out;
    }
    
    //DONE
    static identity (l) {
        let a = [];
        for (let i = 0; i < l; i++) {
            a[i]=[];
            for (let j = 0; j < l; j++) {
                if (i==j) a[i][j]=1; else a[i][j]=0;
            }
        }
        return new Matrix(a);
    }
    
    //DONE
    add (other) {
        if (other instanceof Matrix) {
            if (other.width == this.width && other.height == this.height) {
                for (let i = 0; i < this.height; i++) {
                    for (let j = 0; j < this.width; j++) {
                        this.value[i][j] += other.value[i][j];
                    }
                }
            }
        }
        this.calc_c_widths();
    }
    
    //DONE
    sameSize (other) {
        return (other instanceof Matrix) && (other.width == this.width) && (other.height == this.height)
    }
    
    //DONE
    sameWidth (other) {
        return (other instanceof Matrix) && (other.width == this.width);
    }
    
    //DONE
    sameHeight (other) {
        return (other instanceof Matrix) && (other.height == this.height);
    }
    
    //DONE
    static add(a,b) {
        if (a instanceof Matrix && b instanceof Matrix) {
            if (a.sameSize(b)) {
                let c = [];
                for (let i = 0; i < a.height; i++) {
                    c[i] = [];
                    for (let j = 0; j < a.width; j++) {
                        c[i][j] = a.value[i][j] + b.value[i][j];
                    }
                }
                return new Matrix(c);
            }
        }
    }
    
    //DONE
    static scalerMult(a,s) {
        if (a instanceof Matrix) {
            let c = [];
            for (let i = 0; i < a.height; i++) {
                c[i] = [];
                for (let j = 0; j < a.width; j++) {
                    c[i][j] = a.value[i][j] * s;
                }
            }
            return new Matrix(c);
        }
    }
    
    //DONE
    scalerMult (s) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.value[i][j] = this.value[i][j] * s;
            }
        }
        this.calc_c_widths();
    }
    
    //DONE
    copy () {
        return new Matrix(this.value);
    }
    
    //DONE
    static transpose (a) {
        if (a instanceof Matrix) {
            let c = [];
            for (let i = 0; i < a.width; i++) {
                c[i] = [];
                for (let j = 0; j < a.height; j++) {
                    c[i][j] = 0;
                }
            }
            for (let i = 0; i < a.height; i++) {
                for (let j = 0; j < a.width; j++) {
                    c[j][i] = a.value[i][j];
                }
            }
            return new Matrix(c);
        }
    }
    
    //DONE
    transpose () {
        let c = [];
        for (let i = 0; i < this.width; i++) {
            c[i] = [];
            for (let j = 0; j < this.height; j++) {
                c[i][j] = 0;
            }
        }
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                c[j][i] = this.value[i][j];
            }
        }
        this.value = c;
        this.calc_dim();
        this.calc_c_widths();
    }
    
    //DONE
    static mult(a, b) {
        if (a instanceof Matrix && b instanceof Matrix) {
            if (a.width == b.height) {
                let c = [];
                for (let i = 0; i < a.height; i++) {
                    c[i] = [];
                    for (let j = 0; j < b.width; j++) {
                        let sum = 0;
                        for (let k = 0; k < a.width; k++) {
                            sum += a.value[i][k] * b.value[k][j];
                        }
                        c[i][j] = sum;
                    }
                }
                return new Matrix(c);
            }
        }
    }
    
    //DONE
    mult (other) {
        if (other instanceof Matrix) {
            if (this.width == other.height) {
                let c = [];
                for (let i = 0; i < this.height; i++) {
                    c[i] = [];
                    for (let j = 0; j < other.width; j++) {
                        let sum = 0;
                        for (let k = 0; k < this.width; k++) {
                            sum += this.value[i][k] * other.value[k][j];
                        }
                        c[i][j] = sum;
                    }
                }
                this.value = c;
                this.calc_dim();
                this.calc_c_widths();
            }
        }
    }
    
    /*
    adds row i1 to row i2
    optionally adds i1 * s to row i2 (for ease of multi-step adds)
    */
    //DONE
    rowAdd (i1,i2, s = 1) {
        for (let i = 0; i < this.width; i++) {
            this.value[i2][i] += this.value[i1][i] * s;
        }
    }
    
    /*
    multiplies a row by a scalar
    */
    //DONE
    rowMult (i1,s) {
        for (let i = 0; i < this.width; i++) {
            this.value[i1][i] = this.value[i1][i] * s;
        }
    }
    
    /*
    swaps rows i1 and i2
    */
    //DONE
    rowSwap (i1,i2) {
        let temp = this.value[i2];
        this.value[i2] = this.value[i1];
        this.value[i1] = temp;
    }
    
    //DONE
    static submatrix (a, row, column) {
        if (a instanceof Matrix) {
            let c = [];
            let tr = 0;
            let tc = 0;
            for (let i = 0; i < a.height; i++) {
                tc = 0;
                if (i == row) {
                    tr = -1;
                    continue;
                }
                c[i + tr] = [];
                for (let j = 0; j < a.width; j++) {
                    if (j == column) {
                        tc = -1;
                        continue;
                    }
                    c[i + tr][j + tc] = a.value[i][j];
                }
            }
            return new Matrix(c);
        }
    }
    
    //DONE
    submatrix (row,column) {
        let c = [];
        let tr = 0;
        let tc = 0;
        for (let i = 0; i < this.height; i++) {
            tc = 0;
            if (i == row) {
                tr = -1;
                continue;
            }
            c[i + tr] = [];
            for (let j = 0; j < this.width; j++) {
                if (j == column) {
                    tc = -1;
                    continue;
                }
                c[i + tr][j + tc] = this.value[i][j];
            }
        }
        this.value = c;
        this.calc_dim();
        this.calc_c_widths();
    }
    
    //DONE
    isSquare () {
        return this.width == this.height;
    }
    
    getRowColumn (r,c) {
        return this.value[r][c]
    }
    
    getColumnRow (c,r) {
        return this.value[r][c]
    }
}