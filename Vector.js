class Vector2d {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    static sub(A, B) {
        return new Vector2d(A.x - B.x, A.y - B.y);
    }
    
    add(other) {
        if (other instanceof Vector2d) {
            this.x += other.x;
            this.y += other.y;
        }
    }
    
    sub(other) {
        if (other instanceof Vector2d) {
            this.x -= other.x;
            this.y -= other.y;
        }
    }
    
    mult(scal) {
        this.x = this.x * scal;
        this.y = this.y * scal;
    }

    equal(other) {
        if (other instanceof Vector2d) {
            return (this.x == other.x && this.y == other.y);
        } else {
            return false;
        }
    }
    
    static dot(a, b) {
        if (a instanceof Vector2d && b instanceof Vector2d) {
            return (a.x * b.x) + (a.y * b.y);
        }
    }
    
    get mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    
    set mag(n) {
        let d = this.dir;
        this.x = n * Math.cos(d);
        this.y = n * Math.sin(d);
    }
    
    get dir() {
        return Math.atan2(this.y, this.x);
    }
    
    //in radians
    set dir(n) {
        let temp = this.mag;
        this.x = this.mag * Math.cos(n);
        this.y = this.mag * Math.sin(n);
    }
    
    copy() {
        return new Vector2d(this.x, this.y);
    }
}

class Vector {
    constructor(values) {
        this.components = values;
    }

    add(other) {
        if (other instanceof Vector && other.components.length <= this.components.length) {
            for (let i = 0; i < other.components.length; i++) {
                this.components[i] += other.components[i];
            }
        }
    }

    sub(other) {
        if (other instanceof Vector && other.components.length <= this.components.length) {
            for (let i = 0; i < other.components.length; i++) {
                this.components[i] -= other.components[i];
            }
        }
    }

    mult(scal) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i] *= scal;
        }
    }

    equal(other) {
        if (other instanceof Vector && other.components.length == this.components.length) {
            for (i = 0; i < this.components.length; i++) {
                if (other.components[i] != this.components[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    static dot(A, B) {
        if (A instanceof Vector && B instanceof Vector && A.components.length == B.components.length) {
            let sum = 0;
            for (let i = 0; i < A.components.length; i++) {
                sum += A.components[i] * B.components[i];
            }
            return sum;
        }
    }

    get mag() {
        let sum = 0;
        for (let i = 0; i < this.components.length; i++) {
            sum += this.components[i] * this.components[i];
        }
        return Math.sqrt(sum);
    }

    set mag(n) {
        let angles = this.dirs;
        this.components[0] = n * Math.sin(angles[0]);
        for (let i = 1; i < this.components.length; i++) {
            this.components[i] = n * Math.cos(angles[i - 1]);
        }
    }

    get dirs() {
        let angles = [];
        for (let i = 0; i < this.components.length - 1; i++) {
            angles[i] = Math.atan2(this.components[i+1], this.components[i]);
        }
        return angles;
    }
}