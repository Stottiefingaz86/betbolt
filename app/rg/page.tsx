'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Clock, DollarSign, AlertTriangle, CheckCircle, X } from 'lucide-react'
import { useSessionStore } from '@/lib/store/session'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function RGPage() {
  const { 
    rgLimits, 
    dailyStakeUsed, 
    updateDailyStakeUsed,
    setRGLimits 
  } = useSessionStore()
  
  const [dailyLimit, setDailyLimit] = useState(rgLimits?.daily_stake_limit || 1000)
  const [sessionTimeout, setSessionTimeout] = useState(rgLimits?.session_timeout_mins || 120)
  const [isSelfExcluded, setIsSelfExcluded] = useState(rgLimits?.self_excluded || false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  
  const remainingDailyLimit = dailyLimit - dailyStakeUsed
  const dailyLimitPercentage = (dailyStakeUsed / dailyLimit) * 100
  
  const handleUpdateLimits = () => {
    const newLimits = {
      daily_stake_limit: dailyLimit,
      weekly_stake_limit: rgLimits.weekly_stake_limit,
      monthly_stake_limit: rgLimits.monthly_stake_limit,
      session_timeout_mins: sessionTimeout,
      self_excluded: isSelfExcluded
    }
    
    setRGLimits(newLimits)
    setShowConfirmDialog(false)
  }
  
  const handleSelfExclusion = () => {
    setIsSelfExcluded(true)
    setShowConfirmDialog(true)
  }
  
  const handleRemoveSelfExclusion = () => {
    setIsSelfExcluded(false)
    setShowConfirmDialog(false)
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Responsible Gaming</h1>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-white/10"
          >
            <X size={24} />
          </motion.button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Current Status */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Shield size={24} className="text-blue-400" />
            <span>Current Status</span>
          </h2>
          
          <div className="space-y-4">
            {/* Daily Limit Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Daily Stake Limit</span>
                <span className="text-white font-bold">
                  {formatCurrency(dailyStakeUsed)} / {formatCurrency(dailyLimit)}
                </span>
              </div>
              
              <div className="w-full bg-white/20 rounded-full h-3">
                <motion.div
                  className={cn(
                    'h-3 rounded-full transition-colors',
                    dailyLimitPercentage >= 90 ? 'bg-red-500' :
                    dailyLimitPercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                  )}
                  style={{ width: `${Math.min(dailyLimitPercentage, 100)}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(dailyLimitPercentage, 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {remainingDailyLimit > 0 && (
                <p className="text-sm text-white/70 mt-1">
                  {formatCurrency(remainingDailyLimit)} remaining today
                </p>
              )}
            </div>
            
            {/* Session Timeout */}
            <div className="flex justify-between items-center">
              <span className="text-white/70">Session Timeout</span>
              <span className="text-white font-bold">
                {sessionTimeout} minutes
              </span>
            </div>
            
            {/* Self Exclusion Status */}
            <div className="flex justify-between items-center">
              <span className="text-white/70">Self Exclusion</span>
              <span className={cn(
                'font-bold',
                isSelfExcluded ? 'text-red-400' : 'text-green-400'
              )}>
                {isSelfExcluded ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Set Limits */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <DollarSign size={24} className="text-green-400" />
            <span>Set Limits</span>
          </h2>
          
          <div className="space-y-6">
            {/* Daily Limit */}
            <div>
              <label className="block text-white/70 mb-2">
                Daily Stake Limit
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-white/70">$</span>
                <input
                  type="number"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(parseFloat(e.target.value) || 0)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  min="0"
                  max="10000"
                />
              </div>
            </div>
            
            {/* Session Timeout */}
            <div>
              <label className="block text-white/70 mb-2">
                Session Timeout (minutes)
              </label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={240}>4 hours</option>
                <option value={480}>8 hours</option>
              </select>
            </div>
            
            {/* Update Button */}
            <motion.button
              onClick={() => setShowConfirmDialog(true)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Update Limits
            </motion.button>
          </div>
        </motion.div>
        
        {/* Self Exclusion */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <AlertTriangle size={24} className="text-red-400" />
            <span>Self Exclusion</span>
          </h2>
          
          <div className="space-y-4">
            <p className="text-white/70">
              Self-exclusion allows you to block access to your account for a specified period.
            </p>
            
            {!isSelfExcluded ? (
              <motion.button
                onClick={handleSelfExclusion}
                className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enable Self Exclusion
              </motion.button>
            ) : (
              <div className="space-y-2">
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 font-bold">
                    Self exclusion is currently active
                  </p>
                  <p className="text-red-300 text-sm mt-1">
                    You cannot place bets until the exclusion period ends.
                  </p>
                </div>
                
                <motion.button
                  onClick={handleRemoveSelfExclusion}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Remove Self Exclusion
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Resources */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4">Resources</h2>
          
          <div className="space-y-3">
            <a
              href="https://www.gamblinghelpline.org"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <div className="font-medium">Gambling Helpline</div>
              <div className="text-sm text-white/70">1-800-522-4700</div>
            </a>
            
            <a
              href="https://www.ncpgambling.org"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <div className="font-medium">National Council on Problem Gambling</div>
              <div className="text-sm text-white/70">ncpgambling.org</div>
            </a>
            
            <a
              href="https://www.gamcare.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <div className="font-medium">GamCare</div>
              <div className="text-sm text-white/70">gamcare.org.uk</div>
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black border border-white/20 rounded-2xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-xl font-bold mb-4">Confirm Changes</h3>
            <p className="text-white/70 mb-6">
              Are you sure you want to update your responsible gaming limits?
            </p>
            
            <div className="flex space-x-3">
              <motion.button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                onClick={handleUpdateLimits}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Confirm
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}



